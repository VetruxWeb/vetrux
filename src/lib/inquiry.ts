export interface InquiryPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  monthlyVolume: string;
  requirements: string;
  website?: string;
  formStartedAt?: string;
}

export interface SanitizedInquiryPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  monthlyVolume: string;
  requirements: string;
  website: string;
  formStartedAt: string;
}

export interface InquiryError {
  code:
    | 'invalid_payload'
    | 'missing_field'
    | 'invalid_email'
    | 'invalid_monthly_volume'
    | 'content_too_short'
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

export type ValidationResult =
  | { ok: true; value: SanitizedInquiryPayload }
  | { ok: false; error: InquiryError };

export interface ValidationOptions {
  now?: Date;
}

export interface SubmissionConfig {
  allowedOrigins: string[];
  mailFrom: string;
  mailTo: string;
}

export interface MailRequest {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailResponse {
  messageId?: string;
}

export interface RateLimiter {
  consume(key: string, options: { windowMs: number; limit: number; now: number }): {
    allowed: boolean;
    retryAfterSeconds: number;
    remaining: number;
  };
}

export interface HandleInquirySubmissionArgs {
  payload: InquiryPayload;
  ip: string;
  origin: string | null;
  now?: Date;
  limiter: RateLimiter;
  sendMail: (mail: MailRequest) => Promise<MailResponse>;
  config: SubmissionConfig;
}

export interface SubmissionResponseBody {
  ok: boolean;
  message: string;
  referenceId?: string;
  error?: InquiryError;
}

export interface SubmissionResponse {
  status: number;
  body: SubmissionResponseBody;
}

const ALLOWED_MONTHLY_VOLUMES = new Set(['<10kg', '10-50kg', '50-200kg', '200-500kg', '500kg+']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 160;
const MIN_REQUIREMENTS_LENGTH = 20;
const MAX_REQUIREMENTS_LENGTH = 4000;
const MIN_SUBMISSION_MS = 3_000;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;
const URL_PATTERN = /https?:\/\/|www\./gi;
const HTML_TAG_PATTERN = /<\s*\/?\s*[a-z!][^>]*>/i;
const SCRIPT_PATTERN = /(select\s+.+from|union\s+select|<script|javascript:|onerror\s*=|onload\s*=)/i;

function trimText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function tooManyUrls(text: string): boolean {
  return (text.match(URL_PATTERN) ?? []).length > 2;
}

function buildError(code: InquiryError['code'], message: string): ValidationResult {
  return { ok: false, error: { code, message } };
}

function normalizeOrigin(origin: string): string {
  try {
    return new URL(origin).origin;
  } catch {
    return origin.trim();
  }
}

export function isOriginAllowed(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = normalizeOrigin(origin);
  return allowedOrigins.some((candidate) => {
    const normalizedCandidate = normalizeOrigin(candidate);
    if (!normalizedCandidate) {
      return false;
    }

    if (normalizedCandidate.startsWith('*.')) {
      const suffix = normalizedCandidate.slice(1);
      return normalizedOrigin.endsWith(suffix);
    }

    return normalizedOrigin === normalizedCandidate;
  });
}

export function validateInquiryPayload(payload: InquiryPayload, options: ValidationOptions = {}): ValidationResult {
  const now = options.now ?? new Date();
  const companyName = trimText(payload.companyName);
  const contactPerson = trimText(payload.contactPerson);
  const email = trimText(payload.email).toLowerCase();
  const monthlyVolume = trimText(payload.monthlyVolume);
  const requirements = trimText(payload.requirements);
  const website = trimText(payload.website);
  const formStartedAt = trimText(payload.formStartedAt);

  if (website) {
    return buildError('honeypot_triggered', 'Submission blocked.');
  }

  if (!companyName || !contactPerson || !email || !monthlyVolume || !requirements) {
    return buildError('missing_field', 'Please complete all required fields.');
  }

  if (
    companyName.length > MAX_FIELD_LENGTH ||
    contactPerson.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH
  ) {
    return buildError('content_too_long', 'One or more fields are too long.');
  }

  if (!EMAIL_PATTERN.test(email)) {
    return buildError('invalid_email', 'Please enter a valid email address.');
  }

  if (!ALLOWED_MONTHLY_VOLUMES.has(monthlyVolume)) {
    return buildError('invalid_monthly_volume', 'Please select a valid monthly volume.');
  }

  if (requirements.length < MIN_REQUIREMENTS_LENGTH) {
    return buildError('content_too_short', 'Please add more detail about your requirements.');
  }

  if (requirements.length > MAX_REQUIREMENTS_LENGTH) {
    return buildError('content_too_long', 'Requirements are too long.');
  }

  const suspiciousText = [companyName, contactPerson, requirements].join('\n');
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
      companyName,
      contactPerson,
      email,
      monthlyVolume,
      requirements,
      website,
      formStartedAt: new Date(parsedStartedAt).toISOString(),
    },
  };
}

export function createMemoryRateLimiter(): RateLimiter {
  const buckets = new Map<string, number[]>();

  return {
    consume(key, options) {
      const cutoff = options.now - options.windowMs;
      const existing = buckets.get(key) ?? [];
      const fresh = existing.filter((timestamp) => timestamp > cutoff);

      if (fresh.length >= options.limit) {
        const retryAfterMs = fresh[0] + options.windowMs - options.now;
        buckets.set(key, fresh);
        return {
          allowed: false,
          retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
          remaining: 0,
        };
      }

      fresh.push(options.now);
      buckets.set(key, fresh);
      return {
        allowed: true,
        retryAfterSeconds: 0,
        remaining: Math.max(0, options.limit - fresh.length),
      };
    },
  };
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
  return `VTX-${stamp}-${randomPart}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildMail(payload: SanitizedInquiryPayload, referenceId: string, config: SubmissionConfig, ip: string): MailRequest {
  const submittedAt = new Date().toISOString();
  const subject = `[Website Inquiry] ${payload.companyName} • ${payload.monthlyVolume}`;
  const text = [
    `Reference ID: ${referenceId}`,
    `Submitted At: ${submittedAt}`,
    `Source IP: ${ip}`,
    '',
    `Company Name: ${payload.companyName}`,
    `Contact Person: ${payload.contactPerson}`,
    `Corporate Email: ${payload.email}`,
    `Monthly Volume: ${payload.monthlyVolume}`,
    '',
    'Requirements:',
    payload.requirements,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New Website Inquiry</h2>
      <p><strong>Reference ID:</strong> ${escapeHtml(referenceId)}</p>
      <p><strong>Source IP:</strong> ${escapeHtml(ip)}</p>
      <p><strong>Company Name:</strong> ${escapeHtml(payload.companyName)}</p>
      <p><strong>Contact Person:</strong> ${escapeHtml(payload.contactPerson)}</p>
      <p><strong>Corporate Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Monthly Volume:</strong> ${escapeHtml(payload.monthlyVolume)}</p>
      <p><strong>Requirements:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit; background: #f3f4f6; padding: 12px; border-radius: 8px;">${escapeHtml(payload.requirements)}</pre>
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

export async function handleInquirySubmission(args: HandleInquirySubmissionArgs): Promise<SubmissionResponse> {
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

  const validated = validateInquiryPayload(args.payload, { now });
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

  const requestTime = now.getTime();
  const ipResult = args.limiter.consume(`ip:${args.ip}`, {
    now: requestTime,
    windowMs: 15 * 60 * 1000,
    limit: 3,
  });
  if (!ipResult.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        message: 'Too many inquiries from this network. Please try again later.',
        error: {
          code: 'rate_limited',
          message: 'Too many inquiries from this network. Please try again later.',
        },
      },
    };
  }

  const fingerprintResult = args.limiter.consume(
    `fingerprint:${validated.value.email}:${validated.value.companyName.toLowerCase()}`,
    {
      now: requestTime,
      windowMs: 60 * 60 * 1000,
      limit: 2,
    },
  );
  if (!fingerprintResult.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        message: 'Duplicate inquiry detected. Please wait before submitting again.',
        error: {
          code: 'rate_limited',
          message: 'Duplicate inquiry detected. Please wait before submitting again.',
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
        message: 'Unable to deliver your inquiry at the moment. Please try again later.',
        error: {
          code: 'mail_delivery_failed',
          message: 'Unable to deliver your inquiry at the moment. Please try again later.',
        },
      },
    };
  }

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Inquiry received. Our B2B team will respond within 24 business hours.',
      referenceId,
    },
  };
}
