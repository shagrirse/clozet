import { userRouter } from '~/server/api/routers'
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
  user: userRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
