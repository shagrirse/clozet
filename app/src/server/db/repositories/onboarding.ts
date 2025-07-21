import db from '..'

export const createOnboardingCode = async (userId: string) => {
  return db.telegramOnboardingCode.create({ data: { userId } })
}

export const getOnboardingCode = async (code: string) => {
  return db.telegramOnboardingCode.findUnique({
    where: { code },
    include: {
      user: true,
    },
  })
}

export const markOnboardingCodeUsed = async (
  code: string,
  telegramId: string,
) => {
  const onboardingCode = await db.telegramOnboardingCode.findUnique({
    where: { code },
    select: { used: true, userId: true },
  })

  if (!onboardingCode) {
    throw new Error('Onboarding code not found')
  }

  if (onboardingCode.used) {
    throw new Error('Onboarding code already used')
  }

  const [onboardingObj, user] = await db.$transaction([
    db.telegramOnboardingCode.update({
      where: { code },
      data: { used: true },
    }),
    db.user.update({
      data: {
        telegram: telegramId,
      },
      where: {
        id: onboardingCode.userId,
      },
    }),
  ])

  return {
    onboardingRecord: onboardingObj,
    user,
  }
}
