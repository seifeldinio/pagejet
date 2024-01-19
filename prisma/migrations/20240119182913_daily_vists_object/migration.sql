/*
  Warnings:

  - You are about to drop the column `dailyVisits` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "dailyVisits";

-- CreateTable
CREATE TABLE "DailyVisit" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "DailyVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyVisit" ADD CONSTRAINT "DailyVisit_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
