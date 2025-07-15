import { type DefaultSession, type NextAuthConfig } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER } = process.env

const notConfigured = !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_ISSUER

if (notConfigured) {
  throw Error('⚠️  Auth0 auth credentials were not added')
}

export const authConfig = {
  providers: [
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          role: profile.role ?? 'ADMIN',
          email: profile.email,
          image: profile.image,
        }
      },
    }),
  ],
} satisfies NextAuthConfig
