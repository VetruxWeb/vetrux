import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { supabaseAdmin } from './supabase'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { data: user, error } = await supabaseAdmin
          .from('User')
          .select('*')
          .eq('email', credentials.email as string)
          .single()
        if (error) {
          console.error('[auth] User query error:', error.message)
          return null
        }
        if (!user) {
          console.error('[auth] No user found for:', credentials.email)
          return null
        }
        const valid = await compare(credentials.password as string, user.passwordHash)
        if (!valid) {
          console.error('[auth] Invalid password for:', credentials.email)
          return null
        }
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as unknown as Record<string, unknown>).role
      return token
    },
    session({ session, token }) {
      if (session.user) (session.user as unknown as Record<string, unknown>).role = token.role
      return session
    },
  },
})
