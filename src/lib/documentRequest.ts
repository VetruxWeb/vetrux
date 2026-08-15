import type {
  HumanVerificationResult,
  MailRequest,
  MailResponse,
  RateLimiter,
  SubmissionConfig,
} from './inquiry';
import { isOriginAllowed } from './inquiry';

export type DocumentRequestDocumentType = 'COA' | 'SDS' | 'both';

export interface DocumentRequestPayload {
  name: string;
  email: string;
  documentType: DocumentRequestDocumentType;
  productInterest?: string;
  sourcePage?: string;
  website?: string;
  formStartedAt?: string;
  turnstileToken?: string;
}

export interface SanitizedDocumentRequestPayload {
  name: string;
  email: string;
  documentType: DocumentRequestDocumentType;
  productInterest: string;
  sourcePage: string;
  website: string;
  formStartedAt: string;
  turnstileToken: string;
}

export interface DocumentDownloadLink {
  title: string;
  href: string;
}

export interface DocumentRequestError {
  code:
    | 'invalid_payload'
    | 'missing_field'
    | 'invalid_email'
    | 'invalid_document_type'
    | 'content_too_long'
    | 'honeypot_triggered'
    | 'submission_too_fast'
    | 'submission_expired'
    | 'suspicious_content'
    | 'origin_not_allowed'
    | 'rate_limited'
    | 'mail_configuration_error'
    | 'mail_delivery_failed';
  message: string;
}

export type DocumentRequestValidationResult =
  | { ok: true; value: SanitizedDocumentRequestPayload }
  | { ok: false; error: DocumentRequestError };

export interface DocumentRequestValidationOptions {
  now?: Date;
}

export interface HandleDocumentRequestSubmissionArgs {
  payload: DocumentRequestPayload;
  ip: string;
  origin: string | null;
  now?: Date;
  limiter: RateLimiter;
  sendMail: (mail: MailRequest) => Promise<MailResponse>;
  verifyTurnstile: (args: { token: string; ip: string }) => Promise<HumanVerificationResult>;
  config: SubmissionConfig;
}

export interface DocumentRequestResponseBody {
  ok: boolean;
  message: string;
  referenceId?: string;
  downloadLinks?: DocumentDownloadLink[];
  error?: DocumentRequestError;
}

export interface DocumentRequestResponse {
  status: number;
  body: DocumentRequestResponseBody;
}

const DOCUMENT_TYPES = new Set<DocumentRequestDocumentType>(['COA', 'SDS', 'both']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 180;
const MAX_SOURCE_LENGTH = 300;
const MIN_SUBMISSION_MS = 1_000;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;
const URL_PATTERN = /https?:\/\/|www\./gi;
const HTML_TAG_PATTERN = /<\s*\/?\s*[a-z!][^>]*>/i;
const SCRIPT_PATTERN = /(select\s+.+from|union\s+select|<script|javascript:|onerror\s*=|onload\s*=)/i;

const DOWNLOAD_LINKS: Record<Exclude<DocumentRequestDocumentType, 'both'>, DocumentDownloadLink> = {
  COA: {
    title: 'CBD Isolate Test Report (COA)',
    href: '/documents/vetrux-cbd-test-report.pdf',
  },
  SDS: {
    title: 'GHS Safety Data Sheet (SDS)',
    href: '/documents/vetrux-cbd-isolate-sds-report.pdf',
  },
};

function trimText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function tooManyUrls(text: string): boolean {
  return (text.match(URL_PATTERN) ?? []).length > 0;
}

function buildError(code: DocumentRequestError['code'], message: string): DocumentRequestValidationResult {
  return { ok: false, error: { code, message } };
}

function isValidSourcePage(value: string): boolean {
  if (!value) {
    return true;
  }

  if (value.startsWith('/') && !value.startsWith('//')) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

function createReferenceId(now: Date): string {
  const stamp = now
    .toISOString()
    .replaceAll('-', '')
    .replaceAll(':', '')
    .replaceAll('.', '')
    .replaceAll('T', '')
    .replaceAll('Z', '')
    .slice(0, 14);
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VTX-DOC-${stamp}-${randomPart}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getDocumentLabel(documentType: DocumentRequestDocumentType): string {
  if (documentType === 'both') {
    return 'COA and SDS';
  }
  return documentType;
}

export function getDownloadLinks(documentType: DocumentRequestDocumentType): DocumentDownloadLink[] {
  if (documentType === 'both') {
    return [DOWNLOAD_LINKS.COA, DOWNLOAD_LINKS.SDS];
  }
  return [DOWNLOAD_LINKS[documentType]];
}

export function validateDocumentRequestPayload(
  payload: DocumentRequestPayload,
  options: DocumentRequestValidationOptions = {},
): DocumentRequestValidationResult {
  const now = options.now ?? new Date();
  const name = trimText(payload.name);
  const email = trimText(payload.email).toLowerCase();
  const documentType = trimText(payload.documentType) as DocumentRequestDocumentType;
  const productInterest = trimText(payload.productInterest);
  const sourcePage = trimText(payload.sourcePage);
  const website = trimText(payload.website);
  const formStartedAt = trimText(payload.formStartedAt);
  const turnstileToken = trimText(payload.turnstileToken);

  if (website) {
    return buildError('honeypot_triggered', 'Submission blocked.');
  }

  if (!name || !email || !documentType || !turnstileToken) {
    return buildError('missing_field', 'Please add your name and email.');
  }

  if (!DOCUMENT_TYPES.has(documentType)) {
    return buildError('invalid_document_type', 'Please select a valid document type.');
  }

  if (!EMAIL_PATTERN.test(email)) {
    return buildError('invalid_email', 'Please enter a valid business email address.');
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    productInterest.length > MAX_FIELD_LENGTH ||
    sourcePage.length > MAX_SOURCE_LENGTH
  ) {
    return buildError('content_too_long', 'One or more fields are too long.');
  }

  if (!isValidSourcePage(sourcePage)) {
    return buildError('invalid_payload', 'Source page metadata is invalid.');
  }

  const suspiciousText = [name, productInterest].join('\n');
  if (HTML_TAG_PATTERN.test(suspiciousText) || SCRIPT_PATTERN.test(suspiciousText) || tooManyUrls(suspiciousText)) {
    return buildError('suspicious_content', 'Submission blocked by security filters.');
  }

  const parsedStartedAt = Date.parse(formStartedAt);
  if (Number.isNaN(parsedStartedAt)) {
    return buildError('invalid_payload', 'Form metadata is invalid.');
  }

  const elapsedMs = now.getTime() - parsedStartedAt;
  if (elapsedMs < MIN_SUBMISSION_MS) {
    return buildError('submission_too_fast', 'Submission blocked by anti-spam protection.');
  }

  if (elapsedMs > MAX_FORM_AGE_MS) {
    return buildError('submission_expired', 'Please refresh the page and try again.');
  }

  return {
    ok: true,
    value: {
      name,
      email,
      documentType,
      productInterest,
      sourcePage,
      website,
      formStartedAt: new Date(parsedStartedAt).toISOString(),
      turnstileToken,
    },
  };
}

function buildMail(
  payload: SanitizedDocumentRequestPayload,
  referenceId: string,
  config: SubmissionConfig,
  ip: string,
): MailRequest {
  const submittedAt = new Date().toISOString();
  const documentLabel = getDocumentLabel(payload.documentType);
  const subject = `[Document Request] ${documentLabel} requested - ${payload.email}`;
  const fallback = 'Not provided';

  const text = [
    'A visitor requested quality documents.',
    '',
    `Reference ID: ${referenceId}`,
    `Submitted At: ${submittedAt}`,
    `Document Requested: ${documentLabel}`,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Product Interest: ${payload.productInterest || fallback}`,
    '',
    `Source Page: ${payload.sourcePage || fallback}`,
    `Source IP: ${ip}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">Quality Document Request</h2>
      <p>A visitor requested quality documents. Documents will be sent after your approval.</p>
      <p><strong>Reference ID:</strong> ${escapeHtml(referenceId)}</p>
      <p><strong>Document Requested:</strong> ${escapeHtml(documentLabel)}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 18px 0;" />
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Product Interest:</strong> ${escapeHtml(payload.productInterest || fallback)}</p>
      <p><strong>Source Page:</strong> ${escapeHtml(payload.sourcePage || fallback)}</p>
      <p><strong>Source IP:</strong> ${escapeHtml(ip)}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 18px 0;" />
      <p style="font-size: 12px; color: #6b7280; margin-top: 12px;">
        Reply to the requester to arrange document delivery.
      </p>
    </div>
  `;

  return {
    from: config.mailFrom,
    to: config.mailTo,
    replyTo: payload.email,
    subject,
    text,
    html,
  };
}

export async function handleDocumentRequestSubmission(
  args: HandleDocumentRequestSubmissionArgs,
): Promise<DocumentRequestResponse> {
  const now = args.now ?? new Date();

  if (!isOriginAllowed(args.origin, args.config.allowedOrigins)) {
    return {
      status: 403,
      body: {
        ok: false,
        message: 'Request origin is not allowed.',
        error: {
          code: 'origin_not_allowed',
          message: 'Request origin is not allowed.',
        },
      },
    };
  }

  const validated = validateDocumentRequestPayload(args.payload, { now });
  if (!validated.ok) {
    return {
      status: validated.error.code === 'honeypot_triggered' ? 202 : 400,
      body: {
        ok: false,
        message: validated.error.message,
        error: validated.error,
      },
    };
  }

  const humanVerification = await args.verifyTurnstile({
    token: validated.value.turnstileToken,
    ip: args.ip,
  });
  if (!humanVerification.ok) {
    const message = humanVerification.message ?? 'Human verification failed. Please try again.';
    return {
      status: 400,
      body: {
        ok: false,
        message,
        error: {
          code: 'invalid_payload',
          message,
        },
      },
    };
  }

  const requestTime = now.getTime();
  const ipResult = args.limiter.consume(`doc-ip:${args.ip}`, {
    now: requestTime,
    windowMs: 15 * 60 * 1000,
    limit: 6,
  });
  if (!ipResult.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        message: 'Too many document requests from this network. Please try again later.',
        error: {
          code: 'rate_limited',
          message: 'Too many document requests from this network. Please try again later.',
        },
      },
    };
  }

  const emailResult = args.limiter.consume(`doc-email:${validated.value.email}`, {
    now: requestTime,
    windowMs: 60 * 60 * 1000,
    limit: 3,
  });
  if (!emailResult.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        message: 'Duplicate document request detected. Please wait before submitting again.',
        error: {
          code: 'rate_limited',
          message: 'Duplicate document request detected. Please wait before submitting again.',
        },
      },
    };
  }

  if (!args.config.mailFrom || !args.config.mailTo) {
    return {
      status: 500,
      body: {
        ok: false,
        message: 'Mail service is not configured.',
        error: {
          code: 'mail_configuration_error',
          message: 'Mail service is not configured.',
        },
      },
    };
  }

  const referenceId = createReferenceId(now);

  try {
    await args.sendMail(buildMail(validated.value, referenceId, args.config, args.ip));
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        message: 'Unable to deliver your document request at the moment. Please try again later.',
        error: {
          code: 'mail_delivery_failed',
          message: 'Unable to deliver your document request at the moment. Please try again later.',
        },
      },
    };
  }

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Your request has been received. We will send the documents to your email shortly.',
      referenceId,
    },
  };
}
