import { Update } from 'grammy/types'
import { ApiCallFn } from 'grammy'
import { bot } from '.'

type Function = ApiCallFn<typeof bot.api.raw>
type ResultType = Awaited<ReturnType<Function>>
type Params = Parameters<Function>
type PayloadType = Params[1]

export const isTextPayload = (p: PayloadType): p is { text: string } =>
  'text' in p

// Outgoing requests from the bot (for logging/debugging)
export let outgoingRequests: {
  method: string
  payload: PayloadType
}[] = []

export function generateMessage(message: string): Update {
  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      chat: {
        last_name: 'Test Lastname',
        id: 1111111,
        first_name: 'Test',
        username: 'Test',
        type: 'private',
      },
      message_id: 1365,
      from: {
        last_name: 'Test Lastname',
        id: 1111111,
        first_name: 'Test',
        username: 'Test',
        is_bot: false,
      },
      text: message,
    },
  }
}

beforeAll(async () => {
  bot.api.config.use(async (prev, method, payload) => {
    outgoingRequests.push({
      method,
      payload,
    })
    return { ok: true, result: true as ResultType }
  })

  bot.botInfo = {
    id: 42,
    first_name: 'Test Bot',
    is_bot: true,
    username: 'bot',
    can_join_groups: true,
    can_read_all_group_messages: true,
    supports_inline_queries: false,
    can_connect_to_business: false,
    has_main_web_app: false,
  }
  await bot.init()
}, 2000)

beforeEach(() => {
  outgoingRequests = []
})
