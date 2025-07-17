/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TelegramOnboardingCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TelegramOnboardingCode" ALTER COLUMN "expiresAt" SET DEFAULT (now() + '1 hour'::interval);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramOnboardingCode_userId_key" ON "TelegramOnboardingCode"("userId");
