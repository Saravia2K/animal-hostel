/*
  Warnings:

  - Added the required column `advance_payment` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Made the column `exit_date` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "advance_payment" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "total" DECIMAL(5,2) NOT NULL,
ALTER COLUMN "exit_date" SET NOT NULL;
