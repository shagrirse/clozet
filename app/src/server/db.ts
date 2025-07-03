import { PrismaClient } from '@prisma/client'

const { NODE_ENV } = process.env

const createPrismaClient = () =>
  new PrismaClient({
    log: NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

interface GlobalPrisma {
  prisma?: ReturnType<typeof createPrismaClient>
}

const globalForPrisma = globalThis as typeof globalThis & GlobalPrisma

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (NODE_ENV !== 'production') globalForPrisma.prisma = db
