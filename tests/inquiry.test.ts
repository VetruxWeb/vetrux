import { describe, expect, it, vi } from 'vitest';
import {
  createMemoryRateLimiter,
  handleInquirySubmission,
  validateInquiryPayload,
  type InquiryPayload,
} from '../src/lib/inquiry';

const validPayload: InquiryPayload = {
  companyName: 'Acme Pharmaceuticals Ltd.',
  contactPerson: 'Dr. Jane Smith',
  email: 'procurement@acmepharma.com',
  monthlyVolume: '10-50kg',
  requirements: 'We need CBD isolate with GMP documentation and quarterly supply pricing.',
  website: '',
  formStartedAt: new Date('2026-04-14T19:00:00.000Z').toISOString(),
};

describe('validateInquiryPayload', () => {
  it('accepts a valid inquiry payload', () => {
    const result = validateInquiryPayload(validPayload, {
      now: new Date('2026-04-14T19:00:10.000Z'),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error('Expected valid payload to pass validation');
    }

    expect(result.value.companyName).toBe(validPayload.companyName);
    expect(result.value.email).toBe(validPayload.email);
  });

  it('rejects bot-like submissions that fill the honeypot field', () => {
    const result = validateInquiryPayload(
      {
        ...validPayload,
        website: 'https://spam.example',
      },
      {
        now: new Date('2026-04-14T19:00:10.000Z'),
      },
    );

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('honeypot_triggered');
  });

  it('rejects suspicious payloads submitted unrealistically fast', () => {
    const result = validateInquiryPayload(validPayload, {
      now: new Date('2026-04-14T19:00:01.000Z'),
    });

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('submission_too_fast');
  });
});

describe('handleInquirySubmission', () => {
  it('sends a structured inquiry email for valid requests', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });
    const limiter = createMemoryRateLimiter();

    const response = await handleInquirySubmission({
      payload: validPayload,
      ip: '203.0.113.10',
      origin: 'https://vetrux.tech',
      now: new Date('2026-04-14T19:00:10.000Z'),
      limiter,
      sendMail,
      config: {
        mailFrom: 'postmaster@vetrux.tech',
        mailTo: 'postmaster@vetrux.tech',
        allowedOrigins: ['https://vetrux.tech'],
      },
    });

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({
      from: 'postmaster@vetrux.tech',
      to: 'postmaster@vetrux.tech',
      replyTo: 'procurement@acmepharma.com',
    });
    expect(sendMail.mock.calls[0]?.[0].subject).toContain('Acme Pharmaceuticals');
  });

  it('blocks repeated submissions from the same IP when the limit is exceeded', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });
    const limiter = createMemoryRateLimiter();
    const config = {
      mailFrom: 'postmaster@vetrux.tech',
      mailTo: 'postmaster@vetrux.tech',
      allowedOrigins: ['https://vetrux.tech'],
    };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await handleInquirySubmission({
        payload: {
          ...validPayload,
          email: `buyer${attempt}@acmepharma.com`,
          formStartedAt: new Date(`2026-04-14T19:0${attempt}:00.000Z`).toISOString(),
        },
        ip: '203.0.113.10',
        origin: 'https://vetrux.tech',
        now: new Date(`2026-04-14T19:0${attempt}:10.000Z`),
        limiter,
        sendMail,
        config,
      });

      expect(response.status).toBe(200);
    }

    const blocked = await handleInquirySubmission({
      payload: {
        ...validPayload,
        email: 'buyer-final@acmepharma.com',
        formStartedAt: new Date('2026-04-14T19:03:00.000Z').toISOString(),
      },
      ip: '203.0.113.10',
      origin: 'https://vetrux.tech',
      now: new Date('2026-04-14T19:03:10.000Z'),
      limiter,
      sendMail,
      config,
    });

    expect(blocked.status).toBe(429);
    expect(blocked.body.error.code).toBe('rate_limited');
    expect(sendMail).toHaveBeenCalledTimes(3);
  });

  it('rejects requests from disallowed origins', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });

    const response = await handleInquirySubmission({
      payload: validPayload,
      ip: '203.0.113.10',
      origin: 'https://attacker.example',
      now: new Date('2026-04-14T19:00:10.000Z'),
      limiter: createMemoryRateLimiter(),
      sendMail,
      config: {
        mailFrom: 'postmaster@vetrux.tech',
        mailTo: 'postmaster@vetrux.tech',
        allowedOrigins: ['https://vetrux.tech'],
      },
    });

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('origin_not_allowed');
    expect(sendMail).not.toHaveBeenCalled();
  });
});
