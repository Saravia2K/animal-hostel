-- DropForeignKey
ALTER TABLE "EntriesServices" DROP CONSTRAINT "EntriesServices_id_entry_fkey";

-- DropForeignKey
ALTER TABLE "EntriesServices" DROP CONSTRAINT "EntriesServices_id_service_fkey";

-- AddForeignKey
ALTER TABLE "EntriesServices" ADD CONSTRAINT "EntriesServices_id_entry_fkey" FOREIGN KEY ("id_entry") REFERENCES "Entry"("id_entry") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntriesServices" ADD CONSTRAINT "EntriesServices_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "Service"("id_service") ON DELETE CASCADE ON UPDATE CASCADE;
