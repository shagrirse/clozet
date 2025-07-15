import NextAuth from 'next-auth'
import { cache } from 'react'

import { authConfig } from './config'
import { db } from '~/server/db'
import { PrismaAdapter } from '@auth/prisma-adapter'

const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }

      return token
    },
    authorized: async ({ auth }) => {
      console.log(!!auth)
      return !!auth
    },
  },
})

const auth = cache(uncachedAuth)

export { auth, handlers, signIn, signOut }
