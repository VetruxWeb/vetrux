import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

interface QuoteInquiryPayload {
  name: string;
  company: string;
  email: string;
  message?: string;
  products: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SMTP_PASS) {
      return NextResponse.json(
        { ok: false, message: 'Mail service not configured.' },
        { status: 500 },
      );
    }

    let payload: QuoteInquiryPayload;
    try {
      payload = (await req.json()) as QuoteInquiryPayload;
    } catch {
      return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
    }

    const { name, company, email, message, products } = payload;

    if (!name?.trim() || !company?.trim() || !email?.trim()) {
      return NextResponse.json({ ok: false, message: 'Required fields missing.' }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json({ ok: false, message: 'Invalid email address.' }, { status: 400 });
    }
    if (!products || products.length === 0) {
      return NextResponse.json({ ok: false, message: 'Please select at least one product specification.' }, { status: 400 });
    }

    const productList = products.map((p) => `  • ${p}`).join('\n');
    const refId = `QI-${Date.now().toString(36).toUpperCase()}`;

    const textBody = [
      `[Quick Quote Inquiry] — ${refId}`,
      '',
      `Name: ${name.trim()}`,
      `Company: ${company.trim()}`,
      `Email: ${email.trim()}`,
      '',
      'Selected Products:',
      productList,
      '',
      `Message: ${message?.trim() || '(none)'}`,
    ].join('\n');

    const htmlBody = `
      <h2>Quick Quote Inquiry — ${escapeHtml(refId)}</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(name.trim())}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(company.trim())}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(email.trim())}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Products</td><td style="padding:6px;border:1px solid #ddd"><ul>${products.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul></td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(message?.trim() || '(none)')}</td></tr>
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
      replyTo: email.trim(),
      subject: `[Vetrux Quote] ${company.trim()} — ${products.length} item(s)`,
      text: textBody,
      html: htmlBody,
    });

    await supabaseAdmin.from('Inquiry').insert({
      type: 'quote',
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message?.trim() || null,
      productInterest: products.join('; '),
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
    }).then(({ error }) => {
      if (error) console.error('[quote-inquiry.db.error]', error.message);
    });

    return NextResponse.json({ ok: true, message: 'Inquiry sent successfully.', referenceId: refId });
  } catch (error) {
    console.error('[quote-inquiry.error]', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 });
  }
}
