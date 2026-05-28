import { NextResponse } from 'next/server'
import { apiAuth } from '@/lib/admin/apiAuth'
import { getAiConfig, callAi, buildTranslatePrompt } from '@/lib/admin/ai'

export async function POST(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const body = await request.json()
  const { texts, targetLocale, context } = body

  if (!texts || !targetLocale) {
    return NextResponse.json({ error: 'Missing texts or targetLocale' }, { status: 400 })
  }

  const config = await getAiConfig()
  if (!config) {
    return NextResponse.json({ error: 'AI not configured. Please set API key in Settings.' }, { status: 400 })
  }

  try {
    const { system, user } = buildTranslatePrompt(targetLocale, texts, context)
    const result = await callAi(config, system, user)

    let cleaned = result.trim()
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const translations = JSON.parse(cleaned)
    return NextResponse.json({ translations })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Translation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
