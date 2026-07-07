import { describe, expect, it, vi } from 'vitest';
import {
  getDownloadLinks,
  handleDocumentRequestSubmission,
  validateDocumentRequestPayload,
  type DocumentRequestPayload,
} from '../src/lib/documentRequest';
import { createMemoryRateLimiter } from '../src/lib/inquiry';

const validPayload: DocumentRequestPayload = {
  name: 'Anna Meyer',
  email: 'qa.buyer@example.com',
  documentType: 'both',
  productInterest: 'CBD Isolate',
  sourcePage: '/quality-assurance',
  website: '',
  formStartedAt: new Date('2026-05-02T18:00:00.000Z').toISOString(),
  turnstileToken: 'turnstile-test-token',
};

describe('validateDocumentRequestPayload', () => {
  it('accepts a valid COA/SDS document request', () => {
    const result = validateDocumentRequestPayload(validPayload, {
      now: new Date('2026-05-02T18:00:05.000Z'),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error('Expected valid document request to pass validation');
    }

    expect(result.value.email).toBe('qa.buyer@example.com');
    expect(result.value.name).toBe('Anna Meyer');
    expect(result.value.documentType).toBe('both');
  });

  it('rejects invalid document type values', () => {
    const result = validateDocumentRequestPayload(
      {
        ...validPayload,
        documentType: 'brochure' as DocumentRequestPayload['documentType'],
      },
      {
        now: new Date('2026-05-02T18:00:05.000Z'),
      },
    );

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('invalid_document_type');
  });

  it('requires name, email, and turnstile token', () => {
    const result = validateDocumentRequestPayload(
      {
        ...validPayload,
        name: '',
        email: '',
        turnstileToken: '',
      },
      {
        now: new Date('2026-05-02T18:00:05.000Z'),
      },
    );

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('missing_field');
  });

  it('rejects bot-like submissions that fill the honeypot field', () => {
    const result = validateDocumentRequestPayload(
      {
        ...validPayload,
        website: 'https://spam.example',
      },
      {
        now: new Date('2026-05-02T18:00:05.000Z'),
      },
    );

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('honeypot_triggered');
  });
});

describe('getDownloadLinks', () => {
  it('returns both COA and SDS links for combined requests', () => {
    expect(getDownloadLinks('both')).toEqual([
      {
        title: 'CBD Isolate Test Report (COA)',
        href: '/documents/vetrux-cbd-test-report.pdf',
      },
      {
        title: 'GHS Safety Data Sheet (SDS)',
        href: '/documents/vetrux-cbd-isolate-sds-report.pdf',
      },
    ]);
  });
});

describe('handleDocumentRequestSubmission', () => {
  it('sends a structured document download email and returns download links', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });
    const verifyTurnstile = vi.fn().mockResolvedValue({ ok: true });

    const response = await handleDocumentRequestSubmission({
      payload: validPayload,
      ip: '203.0.113.10',
      origin: 'https://vetrux.tech',
      now: new Date('2026-05-02T18:00:05.000Z'),
      limiter: createMemoryRateLimiter(),
      sendMail,
      verifyTurnstile,
      config: {
        mailFrom: 'postmaster@vetrux.tech',
        mailTo: 'inquiry@vetrux.tech',
        allowedOrigins: ['https://vetrux.tech'],
      },
    });

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.referenceId).toContain('VTX-DOC-');
    // Documents are delivered by the team via email, not returned in the response body.
    expect(verifyTurnstile).toHaveBeenCalledWith({
      token: 'turnstile-test-token',
      ip: '203.0.113.10',
    });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({
      from: 'postmaster@vetrux.tech',
      to: 'inquiry@vetrux.tech',
      replyTo: 'qa.buyer@example.com',
    });
    expect(sendMail.mock.calls[0]?.[0].subject).toContain('[Document Request]');
    expect(sendMail.mock.calls[0]?.[0].text).toContain('Document Requested: COA and SDS');
    expect(sendMail.mock.calls[0]?.[0].text).toContain('Name: Anna Meyer');
    expect(sendMail.mock.calls[0]?.[0].text).toContain('Email: qa.buyer@example.com');
    expect(sendMail.mock.calls[0]?.[0].text).toContain('Source Page: /quality-assurance');
  });

  it('blocks repeated document requests from the same email', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });
    const verifyTurnstile = vi.fn().mockResolvedValue({ ok: true });
    const limiter = createMemoryRateLimiter();
    const config = {
      mailFrom: 'postmaster@vetrux.tech',
      mailTo: 'inquiry@vetrux.tech',
      allowedOrigins: ['https://vetrux.tech'],
    };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await handleDocumentRequestSubmission({
        payload: {
          ...validPayload,
          formStartedAt: new Date(`2026-05-02T18:0${attempt}:00.000Z`).toISOString(),
        },
        ip: `203.0.113.${attempt}`,
        origin: 'https://vetrux.tech',
        now: new Date(`2026-05-02T18:0${attempt}:05.000Z`),
        limiter,
        sendMail,
        verifyTurnstile,
        config,
      });

      expect(response.status).toBe(200);
    }

    const blocked = await handleDocumentRequestSubmission({
      payload: {
        ...validPayload,
        formStartedAt: new Date('2026-05-02T18:03:00.000Z').toISOString(),
      },
      ip: '203.0.113.99',
      origin: 'https://vetrux.tech',
      now: new Date('2026-05-02T18:03:05.000Z'),
      limiter,
      sendMail,
      verifyTurnstile,
      config,
    });

    expect(blocked.status).toBe(429);
    expect(blocked.body.error.code).toBe('rate_limited');
    expect(sendMail).toHaveBeenCalledTimes(3);
  });
});
