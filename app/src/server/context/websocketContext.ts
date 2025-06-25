import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws'
import { getSession } from 'next-auth/react'

/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/v11/context
 */
export const createContext = async (opts: CreateWSSContextFnOptions) => {
  const session = await getSession(opts)

  console.log('[WS] createContext for', session?.user?.name ?? 'unknown user')

  return {
    session,
  }
}
