import { TelegramOnboardingCode, User } from '@prisma/client'
import { createId } from '@paralleldrive/cuid2'

export const getMockUser = (overrides?: Partial<User>): User => {
  const baseUser: User = {
    id: createId(),
    name: 'Test User',
    nickname: null,
    email: 'test@example.com',
    phone: null,
    telegram: null,
    instagram: null,
    role: 'SELLER',
    emailVerified: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return { ...baseUser, ...overrides }
}

export const getMockOnboardingCode = (
  overrides?: Partial<TelegramOnboardingCode>,
): TelegramOnboardingCode => {
  const baseCode: TelegramOnboardingCode = {
    code: createId(),
    userId: createId(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    used: false,
  }

  return { ...baseCode, ...overrides }
}
