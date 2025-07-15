export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { bot } from '~/services/telegram-bot'
import { webhookCallback } from 'grammy'
const { TELEGRAM_SECRET } = process.env

export const POST = (req: Request) => {
  return webhookCallback(bot, 'std/http', {
    secretToken: TELEGRAM_SECRET,
  })(req)
}
