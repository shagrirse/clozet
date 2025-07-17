import { protectedProcedure } from '~/server/api/trpc'
import { addUserSchema } from './user.schema'
import { withTRPCPrismaErrorHandler } from '~/utils/withPrismaErrorHandler'

export const userRouter = {
  add: protectedProcedure.input(addUserSchema).mutation(
    withTRPCPrismaErrorHandler(({ ctx, input }) => {
      const res = ctx.db.user.create({
        data: input!,
      })
      return res
    }),
  ),
}
