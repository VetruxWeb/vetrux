import { NextResponse } from 'next/server'
import { apiAuth } from '@/lib/admin/apiAuth'
import { supabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.qiye.aliyun.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })
}

const DOCUMENTS: Record<string, { filename: string; path: string }> = {
  COA: { filename: 'Vetrux-CBD-Test-Report-COA.pdf', path: 'public/documents/vetrux-cbd-test-report.pdf' },
  SDS: { filename: 'Vetrux-CBD-Isolate-SDS-Report.pdf', path: 'public/documents/vetrux-cbd-isolate-sds-report.pdf' },
}

export async function POST(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { inquiryId } = await request.json()

  if (!inquiryId) {
    return NextResponse.json({ error: 'Missing inquiryId' }, { status: 400 })
  }

  const { data: inquiry } = await supabaseAdmin
    .from('DocumentRequest')
    .select('*')
    .eq('id', inquiryId)
    .single()

  if (!inquiry) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 })
  }

  if (!inquiry.email) {
    return NextResponse.json({ error: 'No email address' }, { status: 400 })
  }

  const documentType = inquiry.documentType || 'both'
  const docs = documentType === 'both' ? ['COA', 'SDS'] : [documentType]

  const attachments = docs.map((type) => {
    const doc = DOCUMENTS[type]
    const filePath = path.resolve(process.cwd(), doc.path)
    return {
      filename: doc.filename,
      content: fs.readFileSync(filePath),
    }
  })

  const transporter = createTransporter()
  const mailFrom = process.env.INQUIRY_MAIL_FROM || process.env.SMTP_USER || 'postmaster@vetrux.tech'

  const docLabel = documentType === 'both' ? 'COA & SDS' : documentType

  await transporter.sendMail({
    from: mailFrom,
    to: inquiry.email,
    subject: `Your Requested Documents (${docLabel}) — Vetrux CBD`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>Your Requested Quality Documents</h2>
        <p>Dear ${inquiry.name || 'Customer'},</p>
        <p>Thank you for your interest in Vetrux CBD products. Please find the requested ${docLabel} document(s) attached to this email.</p>
        <p>If you have any questions about our products or would like to discuss bulk orders, please reply to this email or visit <a href="https://www.vetrux.tech/inquiry">our inquiry page</a>.</p>
        <br/>
        <p>Best regards,<br/>Vetrux CBD Team</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 18px 0;" />
        <p style="font-size: 12px; color: #6b7280;">Vetrux Biotechnology (Chuxiong) Co., Ltd.</p>
      </div>
    `,
    attachments,
  })

  await supabaseAdmin
    .from('DocumentRequest')
    .update({ status: 'fulfilled', sentAt: new Date().toISOString() })
    .eq('id', inquiryId)

  return NextResponse.json({ success: true })
}
