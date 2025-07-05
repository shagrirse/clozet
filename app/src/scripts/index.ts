import { setTelegramWebhook } from './set-telegram-webhook'

async function main() {
  await setTelegramWebhook()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
