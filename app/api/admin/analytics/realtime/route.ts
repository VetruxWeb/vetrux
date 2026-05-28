import { NextResponse } from 'next/server'
import { apiAuth } from '@/lib/admin/apiAuth'
import { fetchRealtimeUsers } from '@/lib/admin/analytics'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  try {
    const data = await fetchRealtimeUsers()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch realtime data'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
