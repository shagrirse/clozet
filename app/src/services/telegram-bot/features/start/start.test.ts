import '~tests/helpers/telegram-test-utils'
import {
  outgoingRequests,
  generateCommand,
  isKeyboardReplyPayload,
  getButtonText,
  isTextPayload,
} from '~tests/helpers/telegram-test-utils'
import { bot } from '~/services/telegram-bot' // Import the fully configured bot
import { Mode } from '~/services/telegram-bot/types'
import { prismaMock } from '~tests/setup/prisma-mock'
import { getMockUser } from '~tests/helpers/mock-data'

describe('start command', () => {
  describe('when user is onboarded', () => {
    it('should reply with welcome message and keyboard with available modes', async () => {
      // Mock user exists in database
      prismaMock.user.findUnique.mockResolvedValue(
        getMockUser({
          telegram: '1111111', // This should match the user ID from generateCommand
        }),
      )

      await bot.handleUpdate(generateCommand('start'))

      // Verify the database was called with correct parameters
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { telegram: '1111111' },
      })

      expect(outgoingRequests).toHaveLength(1)

      const [replyRequest] = outgoingRequests
      expect(replyRequest.method).toBe('sendMessage')

      const payload = replyRequest.payload
      if (isKeyboardReplyPayload(payload)) {
        expect(payload.text).toBe('Please select what you want to do now!')

        // Verify keyboard contains the expected modes
        expect(payload.reply_markup).toBeDefined()

        const keyboard = payload.reply_markup!
        expect(keyboard.keyboard).toBeDefined()
        expect(keyboard.keyboard).toHaveLength(2) // Two rows for two modes

        // Use helper function to extract button text (handles both string and object buttons)
        expect(getButtonText(keyboard.keyboard[0][0])).toBe(Mode.AddItem)
        expect(getButtonText(keyboard.keyboard[1][0])).toBe(Mode.None)
        expect(keyboard.resize_keyboard).toBe(true)
      } else {
        fail('Expected keyboard payload')
      }
    })
  })

  describe('when user is not onboarded', () => {
    it('should ask for onboarding code when user not found in database', async () => {
      // Mock user does not exist in database
      prismaMock.user.findUnique.mockResolvedValue(null)

      await bot.handleUpdate(generateCommand('start'))

      // Verify the database was called with correct parameters
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { telegram: '1111111' },
      })

      expect(outgoingRequests).toHaveLength(1)

      const [replyRequest] = outgoingRequests
      expect(replyRequest.method).toBe('sendMessage')

      const payload = replyRequest.payload

      if (isTextPayload(payload)) {
        expect(payload.text).toContain(
          'Please connect your Telegram account to a Clozet account!',
        )
      } else {
        fail('The reply should be a text payload')
      }
    })
  })
})
