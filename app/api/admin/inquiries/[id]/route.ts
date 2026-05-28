import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { updateInquirySchema } from '@/lib/admin/validators'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const { data: inquiry } = await supabaseAdmin
    .from('Inquiry')
    .select('*')
    .eq('id', id)
    .single()

  if (!inquiry) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(inquiry)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const body = await request.json()
  const parsed = updateInquirySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { data: updated, error } = await supabaseAdmin
    .from('Inquiry')
    .update({ status: parsed.data.status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(updated)
}
