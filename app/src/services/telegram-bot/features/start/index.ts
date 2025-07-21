import { CommandContext, Keyboard } from 'grammy'
import { botContext } from '../../bot'
import { Mode } from '../../types'
import { getUserByTelegramId } from '~/server/db/repositories/user'

export async function start(ctx: CommandContext<botContext>) {
  const telegramId = ctx.from!.id.toString()
  const user = await getUserByTelegramId(telegramId)
  if (!user) {
    await ctx.reply('Please connect your Telegram account to a Clozet account!')
  } else {
    const modes = [Mode.AddItem, Mode.None]
    const buttonRows = modes.map((mode) => [Keyboard.text(mode)])
    const keyboard = Keyboard.from(buttonRows).resized()
    await ctx.reply('Please select what you want to do now!', {
      reply_markup: keyboard,
    })
  }
}
