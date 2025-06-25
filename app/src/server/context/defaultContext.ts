import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/pages/api/auth/[...nextauth]'

/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/v11/context
 */
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerSession(opts.req, opts.res, authOptions)

  console.log('createContext for', session?.user?.name ?? 'unknown user')

  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
