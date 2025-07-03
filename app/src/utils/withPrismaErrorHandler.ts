import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

export function withPrismaErrorHandler<
  T extends (...args: any[]) => Promise<any>,
>(resolver: T): T {
  return (async (...args: any[]) => {
    try {
      return await resolver(...args)
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
  }) as T
}
