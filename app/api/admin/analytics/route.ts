import { NextResponse } from 'next/server'
import { apiAuth } from '@/lib/admin/apiAuth'
import { fetchAnalyticsData } from '@/lib/admin/analytics'

export async function GET(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { searchParams } = new URL(request.url)
  const range = searchParams.get('range') || '7d'
  const days = range === '30d' ? 30 : 7

  try {
    const data = await fetchAnalyticsData(days)
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch analytics'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
