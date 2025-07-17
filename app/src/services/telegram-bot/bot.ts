import { Bot, Context, SessionFlavor } from 'grammy'
const { TELEGRAM_TOKEN: token = 'test-token' } = process.env
import { SessionData } from './types'

// create context for grammy instance
export type botContext = Context & SessionFlavor<SessionData>

// Set your token in the vercel environment variable
export const bot = new Bot<botContext>(token)
