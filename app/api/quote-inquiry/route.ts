import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createMemoryRateLimiter, isOriginAllowed } from '@/lib/inquiry';
import type { HumanVerificationResult } from '@/lib/inquiry';

export const runtime = 'nodejs';

interface QuoteInquiryPayload {
  name: string;
  company: string;
  email: string;
  message?: string;
  products: string[];
  website?: string;
  formStartedAt?: string;
  turnstileToken?: string;
}

interface TurnstileSiteVerifyResponse {
  success?: boolean;
  'error-codes'?: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_PRODUCT_ITEM_LENGTH = 200;
const MAX_PRODUCTS = 20;
const MIN_SUBMISSION_MS = 3_000;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;

const limiter = createMemoryRateLimiter();

function getMailConfig() {
  return {
    host: process.env.SMTP_HOST ?? 'smtp.qiye.aliyun.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
    from: process.env.INQUIRY_MAIL_FROM ?? process.env.SMTP_USER ?? 'postmaster@vetrux.tech',
    to: process.env.INQUIRY_MAIL_TO ?? process.env.SMTP_USER ?? 'postmaster@vetrux.tech',
  };
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getAllowedOrigins(): string[] {
  const defaults = [
    'https://vetrux.tech',
    'https://www.vetrux.tech',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  const envOrigins = (process.env.INQUIRY_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  return Array.from(new Set([...defaults, ...envOrigins, vercelUrl].filter(Boolean)));
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

function getOrigin(req: NextRequest): string | null {
  const origin = req.headers.get('origin');
  if (origin) return origin.trim();

  const referer = req.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      return null;
    }
  }

  return null;
}

async function verifyTurnstile(args: { token: string; ip: string }): Promise<HumanVerificationResult> {
  const secret = (process.env.TURNSTILE_SECRET_KEY ?? '').trim();
  if (!secret) {
    return { ok: false, message: 'Human verification is not configured.' };
  }

  try {
    const body = new URLSearchParams({ secret, response: args.token });
    if (args.ip && args.ip !== 'unknown') {
      body.set('remoteip', args.ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      return { ok: false, message: 'Human verification failed. Please try again.' };
    }

    const result = (await response.json()) as TurnstileSiteVerifyResponse;
    if (!result.success) {
      console.warn('[quote-inquiry.turnstile.failed]', { errorCodes: result['error-codes'] ?? [] });
      return { ok: false, message: 'Human verification failed. Please try again.' };
    }

    return { ok: true };
  } catch (error) {
    console.error('[quote-inquiry.turnstile.error]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, message: 'Human verification failed. Please try again.' };
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Mail service not configured.',
          error: { code: 'mail_configuration_error', message: 'Mail service not configured.' },
        },
        { status: 500 },
      );
    }

    const origin = getOrigin(req);
    if (!isOriginAllowed(origin, getAllowedOrigins())) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Request origin is not allowed.',
          error: { code: 'origin_not_allowed', message: 'Request origin is not allowed.' },
        },
        { status: 403 },
      );
    }

    let payload: QuoteInquiryPayload;
    try {
      payload = (await req.json()) as QuoteInquiryPayload;
    } catch {
      return NextResponse.json(
        { ok: false, message: 'Invalid request.', error: { code: 'invalid_payload', message: 'Invalid request.' } },
        { status: 400 },
      );
    }

    const name = payload.name?.trim() ?? '';
    const company = payload.company?.trim() ?? '';
    const email = payload.email?.trim().toLowerCase() ?? '';
    const message = payload.message?.trim() ?? '';
    const products = Array.isArray(payload.products) ? payload.products.map((p) => (typeof p === 'string' ? p.trim() : '')).filter(Boolean) : [];
    const website = payload.website?.trim() ?? '';
    const formStartedAt = payload.formStartedAt?.trim() ?? '';
    const turnstileToken = payload.turnstileToken?.trim() ?? '';

    // Honeypot field must stay empty.
    if (website) {
      return NextResponse.json(
        { ok: false, message: 'Submission blocked.', error: { code: 'honeypot_triggered', message: 'Submission blocked.' } },
        { status: 202 },
      );
    }

    if (!name || !company || !email || !turnstileToken) {
      return NextResponse.json(
        { ok: false, message: 'Required fields missing.', error: { code: 'missing_field', message: 'Required fields missing.' } },
        { status: 400 },
      );
    }

    if (name.length > MAX_FIELD_LENGTH || company.length > MAX_FIELD_LENGTH || email.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { ok: false, message: 'One or more fields are too long.', error: { code: 'content_too_long', message: 'One or more fields are too long.' } },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid email address.', error: { code: 'invalid_email', message: 'Invalid email address.' } },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { ok: false, message: 'Message is too long.', error: { code: 'content_too_long', message: 'Message is too long.' } },
        { status: 400 },
      );
    }

    if (products.length === 0) {
      return NextResponse.json(
        { ok: false, message: 'Please select at least one product specification.', error: { code: 'missing_field', message: 'Please select at least one product specification.' } },
        { status: 400 },
      );
    }

    if (products.length > MAX_PRODUCTS || products.some((p) => p.length > MAX_PRODUCT_ITEM_LENGTH)) {
      return NextResponse.json(
        { ok: false, message: 'Too many or invalid product selections.', error: { code: 'content_too_long', message: 'Too many or invalid product selections.' } },
        { status: 400 },
      );
    }

    const parsedStartedAt = Date.parse(formStartedAt);
    if (Number.isNaN(parsedStartedAt)) {
      return NextResponse.json(
        { ok: false, message: 'Form metadata is invalid.', error: { code: 'invalid_payload', message: 'Form metadata is invalid.' } },
        { status: 400 },
      );
    }

    const elapsedMs = Date.now() - parsedStartedAt;
    if (elapsedMs < MIN_SUBMISSION_MS) {
      return NextResponse.json(
        { ok: false, message: 'Submission blocked by anti-spam protection.', error: { code: 'submission_too_fast', message: 'Submission blocked by anti-spam protection.' } },
        { status: 400 },
      );
    }

    if (elapsedMs > MAX_FORM_AGE_MS) {
      return NextResponse.json(
        { ok: false, message: 'Please refresh the page and try again.', error: { code: 'submission_expired', message: 'Please refresh the page and try again.' } },
        { status: 400 },
      );
    }

    const ip = getClientIp(req);

    const humanVerification = await verifyTurnstile({ token: turnstileToken, ip });
    if (!humanVerification.ok) {
      const verificationMessage = humanVerification.message ?? 'Human verification failed. Please try again.';
      return NextResponse.json(
        { ok: false, message: verificationMessage, error: { code: 'invalid_payload', message: verificationMessage } },
        { status: 400 },
      );
    }

    const now = Date.now();
    const ipResult = limiter.consume(`ip:${ip}`, { now, windowMs: 15 * 60 * 1000, limit: 3 });
    if (!ipResult.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Too many inquiries from this network. Please try again later.',
          error: { code: 'rate_limited', message: 'Too many inquiries from this network. Please try again later.' },
        },
        { status: 429 },
      );
    }

    const fingerprintResult = limiter.consume(`fingerprint:${email}:${company.toLowerCase()}`, {
      now,
      windowMs: 60 * 60 * 1000,
      limit: 2,
    });
    if (!fingerprintResult.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Duplicate inquiry detected. Please wait before submitting again.',
          error: { code: 'rate_limited', message: 'Duplicate inquiry detected. Please wait before submitting again.' },
        },
        { status: 429 },
      );
    }

    const productList = products.map((p) => `  • ${p}`).join('\n');
    const refId = `QI-${Date.now().toString(36).toUpperCase()}`;

    const textBody = [
      `[Quick Quote Inquiry] — ${refId}`,
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      '',
      'Selected Products:',
      productList,
      '',
      `Message: ${message || '(none)'}`,
    ].join('\n');

    const htmlBody = `
      <h2>Quick Quote Inquiry — ${escapeHtml(refId)}</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(company)}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Products</td><td style="padding:6px;border:1px solid #ddd"><ul>${products.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul></td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(message || '(none)')}</td></tr>
      </table>
    `;

    const config = getMailConfig();
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });

    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `[Vetrux Quote] ${company} — ${products.length} item(s)`,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true, message: 'Inquiry sent successfully.', referenceId: refId });
  } catch (error) {
    console.error('[quote-inquiry.error]', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, message: 'Server error.', error: { code: 'invalid_payload', message: 'Server error.' } }, { status: 500 });
  }
}
