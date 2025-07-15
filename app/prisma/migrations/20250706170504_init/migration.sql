-- CreateTable
CREATE TABLE "TelegramOnboardingCode" (
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TelegramOnboardingCode_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "TelegramOnboardingCode" ADD CONSTRAINT "TelegramOnboardingCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
