import db from '..'

export const getUserByTelegramId = (telegramId: string) => {
  return db.user.findUnique({
    where: {
      telegram: telegramId,
    },
  })
}
