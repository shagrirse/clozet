import { session } from 'grammy'
import { PrismaAdapter } from '@grammyjs/storage-prisma'
import db from '~/server/db'
import { instagramUrlRegex } from '~/lib/constants'
import { Mode } from './types'
import { start } from './features/start'
import { bot } from './bot'
import { conversations } from '@grammyjs/conversations'

bot.use(
  session({
    initial: () => ({ mode: Mode.None }),
    storage: new PrismaAdapter(db.telegramSession),
  }),
)

bot.use(conversations())

// attach all middleware
bot.command('start', start)

bot.on('message:text', async (ctx) => {
  switch (ctx.msg.text) {
    case Mode.AddItem.toString():
      ctx.session.mode = Mode.AddItem
      ctx.reply(
        `*Guide to Adding Items From Instagram*\\
1\\. Navigate to the post that contains the item you want to add\\
1a\\. If the post contains multiple images, scroll to the image that you want to add\\
2\\. Click \`Share to\\.\\.\\.\`\\
3\\. Select Telegram\\
4\\. Send the URL to this bot`,
        {
          parse_mode: 'MarkdownV2',
        },
      )
      break
  }
})

bot.hears(instagramUrlRegex, async (ctx) => {
  const instagramShortcode: string = ctx.match[1]
  const imgIndex: string | undefined = ctx.match[2]
  await ctx.reply(instagramShortcode)
  await ctx.reply(imgIndex ?? 1)
})

export { bot }
