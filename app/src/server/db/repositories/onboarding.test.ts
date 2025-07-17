import { prismaMock } from '~/../test/prisma-mock'
import {
  createOnboardingCode,
  getOnboardingCode,
  markOnboardingCodeUsed,
} from './onboarding'
import { createId } from '@paralleldrive/cuid2'
import { Prisma, TelegramOnboardingCode, User } from '@prisma/client'

describe('repositories.onboarding', () => {
  const mockOnboardingCodeData = (): TelegramOnboardingCode => {
    const code = createId()
    const userId = createId()
    const createdAt = new Date()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
    const onboardingCode = {
      code,
      userId,
      createdAt,
      expiresAt,
      used: false,
    }
    return onboardingCode
  }
  describe('create onboarding code', () => {
    it('should create an onboarding code', async () => {
      const onboardingCode = mockOnboardingCodeData()

      prismaMock.telegramOnboardingCode.create.mockResolvedValue(onboardingCode)

      await expect(
        createOnboardingCode(onboardingCode.userId),
      ).resolves.toEqual(onboardingCode)
    })

    it('throws when userId does not exist', async () => {
      prismaMock.telegramOnboardingCode.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Foreign key constraint failed',
          {
            code: 'P2003',
            clientVersion: '1.0.0',
          },
        ),
      )
      await expect(createOnboardingCode('nonexistent-user-id')).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      )
    })

    it('throws when one user tries to generate another code', async () => {
      prismaMock.telegramOnboardingCode.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '1.0.0',
        }),
      )

      await expect(createOnboardingCode('duplicate-user-id')).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      )
    })
  })

  describe('get onboarding code', () => {
    it('should get a valid onboarding code', async () => {
      const mockCode = createId()
      const onboardingCode = mockOnboardingCodeData()

      prismaMock.telegramOnboardingCode.findUnique.mockResolvedValue(
        onboardingCode,
      )

      const result = getOnboardingCode(mockCode)
      await expect(result).resolves.toEqual(onboardingCode)
      expect(prismaMock.telegramOnboardingCode.findUnique).toHaveBeenCalledWith(
        {
          where: { code: mockCode },
        },
      )
    })

    it('should return null if onboarding code does not exist', async () => {
      prismaMock.telegramOnboardingCode.findUnique.mockResolvedValue(null)
      await expect(getOnboardingCode('nonexistent-code')).resolves.toBeNull()
    })
  })

  describe('mark onboarding code used', () => {
    it('should mark the record as used', async () => {
      const userId = createId()
      const telegramId = '123456789'
      const onboardingCode = mockOnboardingCodeData()
      const findUnique = jest.fn()
      findUnique.mockReturnValue({
        used: false,
        userId,
      } as Partial<TelegramOnboardingCode>)

      // First, mock findUnique to return a code that is not used
      prismaMock.telegramOnboardingCode.findUnique.mockImplementation(
        findUnique,
      )

      // Then, mock update to return the updated record
      prismaMock.telegramOnboardingCode.update.mockResolvedValue({
        ...onboardingCode,
        used: true,
      })
      // Finally, ensure the user record is updated with the telegram id
      const mockUser: User = {
        name: 'test-name',
        createdAt: new Date(),
        id: userId,
        nickname: null,
        email: null,
        phone: null,
        telegram: telegramId,
        instagram: null,
        role: 'SELLER',
        emailVerified: null,
        image: null,
        updatedAt: new Date(),
      }

      prismaMock.$transaction.mockResolvedValue([
        { ...onboardingCode, used: true }, // onboardingObj
        mockUser, // user
      ])

      const mockResponse = {
        onboardingRecord: {
          ...onboardingCode,
          used: true,
        },
        user: {
          ...mockUser,
          telegram: telegramId,
        },
      }

      await expect(
        markOnboardingCodeUsed(onboardingCode.code, telegramId),
      ).resolves.toEqual(mockResponse)

      expect(prismaMock.telegramOnboardingCode.update).toHaveBeenCalledWith({
        where: { code: onboardingCode.code },
        data: { used: true },
      })
      expect(prismaMock.telegramOnboardingCode.findUnique).toHaveBeenCalledWith(
        {
          where: { code: onboardingCode.code },
          select: { used: true, userId: true },
        },
      )
    })
    it.todo('should throw if there is no onboarding code found')
    it.todo('should throw if the onboarding code has been used')
  })
})
