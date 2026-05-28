import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { del } from '@vercel/blob'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const { data: media } = await supabaseAdmin
    .from('Media')
    .select('*')
    .eq('id', id)
    .single()

  if (!media) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await del(media.url)
  await supabaseAdmin.from('Media').delete().eq('id', id)

  return NextResponse.json({ success: true })
}
