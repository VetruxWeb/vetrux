import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function apiAuth() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return session
}
