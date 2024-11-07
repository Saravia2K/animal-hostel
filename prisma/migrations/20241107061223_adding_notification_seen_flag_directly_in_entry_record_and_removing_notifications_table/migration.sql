/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "notification_seen" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Notification";
