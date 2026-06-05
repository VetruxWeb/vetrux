import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { put } from '@vercel/blob'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { data: media } = await supabaseAdmin
    .from('Media')
    .select('*')
    .order('createdAt', { ascending: false })

  return NextResponse.json(media || [])
}

export async function POST(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || 'general'
  const alt = (formData.get('alt') as string) || ''

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    const blob = await put(`${folder}/${file.name}`, file, {
      access: 'public',
    })

    const { data: media, error } = await supabaseAdmin
      .from('Media')
      .insert({
        filename: file.name,
        url: blob.url,
        mimeType: file.type,
        size: file.size,
        alt,
        folder,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(media, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error'
    console.error('[media upload]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
