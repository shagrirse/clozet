const { APP_URL: webhookBaseUrl = '' } = process.env
import { bot } from '~/lib/telegram-bot'

export async function setTelegramWebhook() {
  const webhookUrl = webhookBaseUrl + '/api/webhook/telegram'
  try {
    await bot.api.deleteWebhook()
    const res = await bot.api.setWebhook(webhookUrl)
    if (res) {
      console.log(`✅ Telegram Webhook URL set to ${webhookUrl}`)
    }
  } catch (reason) {
    console.log(`❌ Telegram Webhook URL was not set`)
    console.log(reason)
  }
}
