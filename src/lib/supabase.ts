import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_client) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (!url || !key) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
      }
      _client = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    }
    return (_client as any)[prop]
  },
})
