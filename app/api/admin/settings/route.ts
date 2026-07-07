import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { data: settings } = await supabaseAdmin
    .from('SiteSetting')
    .select('*')

  const result: Record<string, string> = {}
  for (const s of settings || []) {
    result[s.key] = s.value
  }

  return NextResponse.json(result)
}

export async function PUT(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const body = await request.json()

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  for (const [key, value] of Object.entries(body)) {
    const { data: existing } = await supabaseAdmin
      .from('SiteSetting')
      .select('id')
      .eq('key', key)
      .single()

    if (existing) {
      await supabaseAdmin.from('SiteSetting').update({ value: String(value) }).eq('id', existing.id)
    } else {
      await supabaseAdmin.from('SiteSetting').insert({ id: crypto.randomUUID(), key, value: String(value) })
    }
  }

  return NextResponse.json({ success: true })
}
