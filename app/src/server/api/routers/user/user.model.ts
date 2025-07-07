import { protectedProcedure } from '~/server/api/trpc'
import { addUserSchema } from './user.schema'
import { withPrismaErrorHandler } from '~/utils/withPrismaErrorHandler'

export const userRouter = {
  add: protectedProcedure.input(addUserSchema).mutation(
    withPrismaErrorHandler(({ ctx, input }) => {
      const res = ctx.db.user.create({
        data: input!,
      })
      return res
    }),
  ),
}
