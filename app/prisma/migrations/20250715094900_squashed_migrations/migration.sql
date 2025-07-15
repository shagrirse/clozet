-- AlterTable
ALTER TABLE "ItemImage" ADD COLUMN     "instagramShortcode" TEXT;

-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" TEXT NOT NULL,
    "postUrl" TEXT NOT NULL,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_id_key" ON "InstagramPost"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_postUrl_key" ON "InstagramPost"("postUrl");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_telegram_fkey" FOREIGN KEY ("telegram") REFERENCES "TelegramSession"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_instagramShortcode_fkey" FOREIGN KEY ("instagramShortcode") REFERENCES "InstagramPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
