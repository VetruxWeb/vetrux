import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { data: inquiries } = await supabaseAdmin
    .from('Inquiry')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(100)

  return NextResponse.json(inquiries || [])
}
