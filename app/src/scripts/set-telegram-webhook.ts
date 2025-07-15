const { APP_URL: webhookBaseUrl = '', TELEGRAM_SECRET } = process.env
import { bot } from '~/services/telegram-bot'

export async function setTelegramWebhook() {
  const webhookUrl = webhookBaseUrl + '/api/webhook/telegram'
  try {
    if (!TELEGRAM_SECRET) throw Error('No telegram secret set in envvar')
    await bot.api.deleteWebhook()
    const res = await bot.api.setWebhook(webhookUrl, {
      secret_token: TELEGRAM_SECRET,
    })
    if (res) {
      console.log(`✅ Telegram Webhook URL set to ${webhookUrl}`)
    }
  } catch (reason) {
    console.log(`❌ Telegram Webhook URL was not set`)
    console.log(reason)
  }
}
