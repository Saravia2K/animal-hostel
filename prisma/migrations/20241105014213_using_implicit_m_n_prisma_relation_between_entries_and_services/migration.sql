/*
  Warnings:

  - You are about to drop the `EntriesServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EntriesServices" DROP CONSTRAINT "EntriesServices_id_entry_fkey";

-- DropForeignKey
ALTER TABLE "EntriesServices" DROP CONSTRAINT "EntriesServices_id_service_fkey";

-- DropTable
DROP TABLE "EntriesServices";

-- CreateTable
CREATE TABLE "_EntryToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToService_AB_unique" ON "_EntryToService"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToService_B_index" ON "_EntryToService"("B");

-- AddForeignKey
ALTER TABLE "_EntryToService" ADD CONSTRAINT "_EntryToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id_entry") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToService" ADD CONSTRAINT "_EntryToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id_service") ON DELETE CASCADE ON UPDATE CASCADE;
