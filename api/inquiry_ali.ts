import nodemailer from 'nodemailer';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  createMemoryRateLimiter,
  handleInquirySubmission,
  type InquiryPayload,
} from '../src/lib/inquiry';

interface RequestLike extends IncomingMessage {
  body?: unknown;
}

const limiter = createMemoryRateLimiter();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.qiye.aliyun.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
  auth: process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

function getAllowedOrigins(): string[] {
  const defaults = [
    'https://vetrux.tech',
    'https://www.vetrux.tech',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  const envOrigins = (process.env.INQUIRY_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  return Array.from(new Set([...defaults, ...envOrigins, vercelUrl].filter(Boolean)));
}

function getClientIp(req: IncomingMessage): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return req.socket.remoteAddress ?? 'unknown';
}

function getOrigin(req: IncomingMessage): string | null {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && origin.trim()) {
    return origin.trim();
  }

  const referer = req.headers.referer;
  if (typeof referer === 'string' && referer.trim()) {
    try {
      return new URL(referer).origin;
    } catch {
      return null;
    }
  }

  return null;
}

async function readBody(req: RequestLike): Promise<unknown> {
  if (req.body !== undefined) {
    return req.body;
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;

    if (totalBytes > 20_000) {
      throw new Error('body_too_large');
    }

    chunks.push(buffer);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function json(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req: RequestLike, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    json(res, 405, {
      ok: false,
      message: 'Method not allowed.',
      error: {
        code: 'invalid_payload',
        message: 'Method not allowed.',
      },
    });
    return;
  }

  if (!process.env.SMTP_PASS) {
    json(res, 500, {
      ok: false,
      message: 'SMTP credentials are not configured.',
      error: {
        code: 'mail_configuration_error',
        message: 'SMTP credentials are not configured.',
      },
    });
    return;
  }

  let payload: InquiryPayload;
  try {
    payload = (await readBody(req)) as InquiryPayload;
  } catch (error) {
    const message = error instanceof Error && error.message === 'body_too_large'
      ? 'Payload too large.'
      : 'Invalid request body.';
    json(res, 400, {
      ok: false,
      message,
      error: {
        code: 'invalid_payload',
        message,
      },
    });
    return;
  }

  const response = await handleInquirySubmission({
    payload,
    ip: getClientIp(req),
    origin: getOrigin(req),
    now: new Date(),
    limiter,
    sendMail: (mail) => transporter.sendMail(mail),
    config: {
      allowedOrigins: getAllowedOrigins(),
      mailFrom: process.env.INQUIRY_MAIL_FROM ?? process.env.SMTP_USER ?? 'postmaster@vetrux.tech',
      mailTo: process.env.INQUIRY_MAIL_TO ?? 'postmaster@vetrux.tech',
    },
  });

  json(res, response.status, response.body);
}
