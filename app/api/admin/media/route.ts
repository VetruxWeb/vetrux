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

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'application/pdf',
]

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB, within Vercel's 4.5MB request body limit

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

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || 'unknown'}. Allowed types: JPEG, PNG, WebP, GIF, AVIF, PDF.` },
      { status: 400 }
    )
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
      { status: 400 }
    )
  }

  try {
    const blob = await put(`${folder}/${file.name}`, file, {
      access: 'public',
      contentType: file.type,
    })

    const { data: media, error } = await supabaseAdmin
      .from('Media')
      .insert({
        id: crypto.randomUUID(),
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
