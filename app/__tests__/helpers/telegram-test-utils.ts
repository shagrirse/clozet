import { KeyboardButton, Update } from 'grammy/types'
import { ApiCallFn } from 'grammy'
import { bot } from '~/services/telegram-bot/bot'
import { ReplyKeyboardMarkup } from 'grammy/types'

type Function = ApiCallFn<typeof bot.api.raw>
type ResultType = Awaited<ReturnType<Function>>
type Params = Parameters<Function>
type PayloadType = Params[1]

// Type for sendMessage payload with keyboard
type KeyboardReplyPayload = {
  text: string
  reply_markup?: ReplyKeyboardMarkup
}

// Helper function to assert if the bot sent a keyboard reply as the payload
export const isKeyboardReplyPayload = (
  payload: PayloadType,
): payload is KeyboardReplyPayload => {
  return (
    typeof payload === 'object' &&
    'text' in payload &&
    'reply_markup' in payload
  )
}

// Helper function to extract button text from KeyboardButton (can be string or object)
export const getButtonText = (button: KeyboardButton): string => {
  return typeof button === 'string' ? button : button.text
}

// Helper function to assert if the bot sent a text reply as the payload
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

export function generateCommand(command: string, userId?: number): Update {
  const defaultUserId = 1111111
  const actualUserId = userId ?? defaultUserId

  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      chat: {
        last_name: 'Test Lastname',
        id: actualUserId,
        first_name: 'Test',
        username: 'Test',
        type: 'private' as const,
      },
      message_id: 1365,
      from: {
        last_name: 'Test Lastname',
        id: actualUserId,
        first_name: 'Test',
        username: 'Test',
        is_bot: false,
      },
      text: `/${command}`,
      entities: [
        {
          offset: 0,
          length: command.length + 1,
          type: 'bot_command' as const,
        },
      ],
    },
  }
}

beforeAll(async () => {
  bot.api.config.use(async (_prev, method, payload) => {
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
}, 5000)

beforeEach(() => {
  outgoingRequests = []
})
