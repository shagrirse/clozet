import { CommandContext, Keyboard } from 'grammy'
import { botContext } from '../..'
import { Mode } from '../../types'

export async function start(ctx: CommandContext<botContext>) {
  const modes = [Mode.AddItem, Mode.None]
  const buttonRows = modes.map((mode) => [Keyboard.text(mode)])
  const keyboard = Keyboard.from(buttonRows).resized()
  await ctx.reply('Please select what you want to do now!', {
    reply_markup: keyboard,
  })
}
