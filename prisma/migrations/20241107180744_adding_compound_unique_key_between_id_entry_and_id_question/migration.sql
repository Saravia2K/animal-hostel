/*
  Warnings:

  - A unique constraint covering the columns `[id_entry,id_question]` on the table `Questionnaire` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_id_entry_id_question_key" ON "Questionnaire"("id_entry", "id_question");
