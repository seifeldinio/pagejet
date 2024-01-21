/*
  Warnings:

  - A unique constraint covering the columns `[shareURL]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - The required column `shareURL` was added to the `Page` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "shareURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Page_shareURL_key" ON "Page"("shareURL");
