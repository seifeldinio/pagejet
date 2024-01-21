-- CreateTable
CREATE TABLE "PageDailyVisit" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "PageDailyVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageDailyVisit" ADD CONSTRAINT "PageDailyVisit_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
