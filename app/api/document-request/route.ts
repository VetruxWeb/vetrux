import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createMemoryRateLimiter } from '@/lib/inquiry';
import { handleDocumentRequestSubmission } from '@/lib/documentRequest';
import type { DocumentRequestPayload } from '@/lib/documentRequest';
import type { HumanVerificationResult } from '@/lib/inquiry';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

interface TurnstileSiteVerifyResponse {
  success?: boolean;
  'error-codes'?: string[];
}

const limiter = createMemoryRateLimiter();

type MailProvider = 'aliyun' | 'gmail' | 'custom';

interface MailProviderConfig {
  host: string;
  port: number;
  secure: boolean;
  defaultMailFrom: string;
  defaultMailTo: string;
}

function getMailProvider(): MailProvider {
  const provider = (process.env.INQUIRY_MAIL_PROVIDER ?? 'aliyun').trim().toLowerCase();
  if (provider === 'aliyun' || provider === 'gmail' || provider === 'custom') {
    return provider;
  }
  return 'aliyun';
}

function getMailProviderConfig(): MailProviderConfig {
  const provider = getMailProvider();

  if (provider === 'aliyun') {
    return {
      host: process.env.SMTP_HOST ?? 'smtp.qiye.aliyun.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
      defaultMailFrom: process.env.SMTP_USER ?? 'postmaster@vetrux.tech',
      defaultMailTo: process.env.SMTP_USER ?? 'postmaster@vetrux.tech',
    };
  }

  if (provider === 'custom') {
    return {
      host: process.env.SMTP_HOST ?? 'localhost',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
      defaultMailFrom: process.env.INQUIRY_MAIL_FROM ?? process.env.SMTP_USER ?? 'noreply@example.com',
      defaultMailTo: process.env.INQUIRY_MAIL_TO ?? process.env.SMTP_USER ?? 'noreply@example.com',
    };
  }

  return {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
    defaultMailFrom: process.env.SMTP_USER ?? 'your-gmail-address@gmail.com',
    defaultMailTo: process.env.SMTP_USER ?? 'your-gmail-address@gmail.com',
  };
}

function createTransporter() {
  const providerConfig = getMailProviderConfig();
  return nodemailer.createTransport({
    host: providerConfig.host,
    port: providerConfig.port,
    secure: providerConfig.secure,
    auth: process.env.SMTP_USER && process.env.SMTP_PASS
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
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
      console.warn('[document-request.turnstile.failed]', { errorCodes: result['error-codes'] ?? [] });
      return { ok: false, message: 'Human verification failed. Please try again.' };
    }

    return { ok: true };
  } catch (error) {
    console.error('[document-request.turnstile.error]', {
      error: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, message: 'Human verification failed. Please try again.' };
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          message: 'SMTP credentials are not configured.',
          error: {
            code: 'mail_configuration_error',
            message: 'SMTP credentials are not configured.',
          },
        },
        { status: 500 },
      );
    }

    let payload: DocumentRequestPayload;
    try {
      payload = (await req.json()) as DocumentRequestPayload;
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid request body.',
          error: { code: 'invalid_payload', message: 'Invalid request body.' },
        },
        { status: 400 },
      );
    }

    const transporter = createTransporter();
    const mailProviderConfig = getMailProviderConfig();
    const effectiveMailFrom = process.env.INQUIRY_MAIL_FROM ?? mailProviderConfig.defaultMailFrom;
    const effectiveMailTo = process.env.INQUIRY_MAIL_TO ?? mailProviderConfig.defaultMailTo;
    const provider = getMailProvider();

    const response = await handleDocumentRequestSubmission({
      payload,
      ip: getClientIp(req),
      origin: getOrigin(req),
      now: new Date(),
      limiter,
      sendMail: async (mail) => {
        try {
          const result = await transporter.sendMail(mail);
          console.info('[document-request.smtp.sent]', {
            provider, host: mailProviderConfig.host, port: mailProviderConfig.port,
            secure: mailProviderConfig.secure, authUser: process.env.SMTP_USER ?? '',
            mailFrom: effectiveMailFrom, mailTo: effectiveMailTo,
            messageId: result.messageId, accepted: result.accepted,
            rejected: result.rejected, response: result.response,
          });
          return result;
        } catch (error) {
          console.error('[document-request.smtp.error]', {
            provider, host: mailProviderConfig.host, port: mailProviderConfig.port,
            secure: mailProviderConfig.secure, authUser: process.env.SMTP_USER ?? '',
            mailFrom: effectiveMailFrom, mailTo: effectiveMailTo,
            error: error instanceof Error ? error.message : String(error),
          });
          throw error;
        }
      },
      verifyTurnstile,
      config: {
        allowedOrigins: getAllowedOrigins(),
        mailFrom: effectiveMailFrom,
        mailTo: effectiveMailTo,
      },
    });

    if (response.status === 200) {
      // Store document request in database
      await supabaseAdmin.from('DocumentRequest').insert({
        id: response.body.referenceId,
        name: payload.name ?? '',
        email: payload.email ?? '',
        documentType: payload.documentType ?? 'both',
        productInterest: payload.productInterest ?? null,
        sourcePage: payload.sourcePage ?? null,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ip: getClientIp(req),
      }).then(({ error }) => {
        if (error) console.error('[document-request.db.error]', error.message);
      });

      console.info('[document-request.accepted]', {
        provider, host: mailProviderConfig.host, authUser: process.env.SMTP_USER ?? '',
        mailFrom: effectiveMailFrom, mailTo: effectiveMailTo,
        referenceId: response.body.referenceId,
      });
    }

    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    console.error('[document-request.unhandled]', {
      error: error instanceof Error ? error.stack ?? error.message : String(error),
    });

    return NextResponse.json(
      {
        ok: false,
        message: 'Internal server error.',
        error: { code: 'invalid_payload', message: 'Internal server error.' },
      },
      { status: 500 },
    );
  }
}
