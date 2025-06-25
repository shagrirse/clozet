import { router, authedProcedure } from '../trpc'

export const appRouter = router({
  healthcheck: authedProcedure.query(() => 'yay!'),
})

export type AppRouter = typeof appRouter
