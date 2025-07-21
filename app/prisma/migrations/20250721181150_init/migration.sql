/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegram]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instagram]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_key" ON "User"("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_instagram_key" ON "User"("instagram");
