import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { TRPCContext } from '~/server/api/trpc'

export function withPrismaErrorHandler<I = undefined, R = unknown>(
  handler: (opts: { ctx: TRPCContext; input?: I }) => Promise<R>,
): (opts: { ctx: TRPCContext; input?: I }) => Promise<R> {
  return async (opts) => {
    try {
      return await handler(opts)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Unique constraint failed.',
            })
          default:
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: error.message,
            })
        }
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.',
      })
    }
  }
}
