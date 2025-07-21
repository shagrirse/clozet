import { Bot, Context, SessionFlavor } from 'grammy'
import { type ConversationFlavor } from '@grammyjs/conversations'
const { TELEGRAM_TOKEN: token = 'test-token' } = process.env
import { SessionData } from './types'

// create context for grammy instance
export type botContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context>

// Set your token in the vercel environment variable
export const bot = new Bot<botContext>(token)
