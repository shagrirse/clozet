export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { bot } from '~/lib/telegram-bot'

import { webhookCallback } from 'grammy'

export const POST = (req: Request) => {
  return webhookCallback(bot, 'std/http')(req)
}
