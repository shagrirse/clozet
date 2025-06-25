import NextAuth, { NextAuthOptions } from 'next-auth'
import type { AppProviders } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import Auth0Provider from 'next-auth/providers/auth0'

let useMockProvider =
  process.env.NODE_ENV === 'test' ||
  process.env.RAILWAY_ENVIRONMENT_NAME?.includes('-pr-') // example: 'trpc-pr-5821'

const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER,
  NODE_ENV,
  APP_ENV,
} = process.env

const notConfigured = !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_ISSUER

if ((NODE_ENV !== 'production' || APP_ENV === 'test') && notConfigured) {
  console.log('⚠️ Using mocked Auth0 auth correct credentials were not added')
  useMockProvider = true
}
const providers: AppProviders = []
if (useMockProvider) {
  providers.push(
    CredentialsProvider({
      id: 'github',
      name: 'Mocked GitHub',
      async authorize(credentials) {
        if (credentials) {
          const name = credentials.name
          return {
            id: name,
            name: name,
            email: name,
          }
        }
        return null
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  )
} else {
  if (notConfigured) {
    throw new Error(
      'AUTH0_CLIENT_ID and AUTH0_CLIENT_SECRET and AUTH0_ISSUER must be set',
    )
  }
  providers.push(
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
    }),
  )
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn() {
      return true
    },
    redirect({ baseUrl }) {
      return baseUrl
    },
    session({ session }) {
      return session
    },
    jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
  },
}
export default NextAuth(authOptions)
