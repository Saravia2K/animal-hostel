/*
  Warnings:

  - You are about to drop the column `id_service` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_id_service_fkey";

-- DropIndex
DROP INDEX "idx_id_service";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "id_service";

-- CreateTable
CREATE TABLE "EntriesServices" (
    "id_entry_service" SERIAL NOT NULL,
    "id_entry" INTEGER NOT NULL,
    "id_service" INTEGER NOT NULL,

    CONSTRAINT "EntriesServices_pkey" PRIMARY KEY ("id_entry_service")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id_notification" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "url" VARCHAR(100),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id_notification")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntriesServices_id_entry_id_service_key" ON "EntriesServices"("id_entry", "id_service");

-- AddForeignKey
ALTER TABLE "EntriesServices" ADD CONSTRAINT "EntriesServices_id_entry_fkey" FOREIGN KEY ("id_entry") REFERENCES "Entry"("id_entry") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntriesServices" ADD CONSTRAINT "EntriesServices_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "Service"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;
