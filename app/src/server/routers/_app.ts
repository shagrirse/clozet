/**
 * This file contains the root router of your tRPC-backend
 */
import { router, publicProcedure } from '../trpc'
import { postRouter } from './post'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,

  randomNumber: publicProcedure.subscription(async function* () {
    while (true) {
      yield Math.random()
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }),
})

export type AppRouter = typeof appRouter
