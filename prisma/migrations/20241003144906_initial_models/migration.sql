-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Veterinarian" (
    "id_veterinarian" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "clinic_name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,

    CONSTRAINT "Veterinarian_pkey" PRIMARY KEY ("id_veterinarian")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id_pet" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "breed" TEXT NOT NULL,
    "coat_color" TEXT NOT NULL,
    "extra_data" TEXT,
    "id_owner" INTEGER NOT NULL,
    "id_veterinarian" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id_pet")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id_owner" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "home" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "facebook" TEXT,
    "references" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id_owner")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id_entry" SERIAL NOT NULL,
    "id_pet" INTEGER NOT NULL,
    "id_service" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "exit_date" TIMESTAMP(3),
    "annotations" TEXT,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id_entry")
);

-- CreateTable
CREATE TABLE "Service" (
    "id_service" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id_questionnaire" SERIAL NOT NULL,
    "id_entry" INTEGER NOT NULL,
    "id_question" INTEGER NOT NULL,
    "answer" TEXT,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id_questionnaire")
);

-- CreateTable
CREATE TABLE "Question" (
    "id_question" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id_question")
);

-- CreateIndex
CREATE INDEX "idx_id_owner" ON "Pet"("id_owner");

-- CreateIndex
CREATE INDEX "idx_id_veterinarian" ON "Pet"("id_veterinarian");

-- CreateIndex
CREATE INDEX "idx_id_pet" ON "Entry"("id_pet");

-- CreateIndex
CREATE INDEX "idx_id_service" ON "Entry"("id_service");

-- CreateIndex
CREATE INDEX "idx_id_entry" ON "Questionnaire"("id_entry");

-- CreateIndex
CREATE INDEX "idx_id_question" ON "Questionnaire"("id_question");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owner"("id_owner") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_id_veterinarian_fkey" FOREIGN KEY ("id_veterinarian") REFERENCES "Veterinarian"("id_veterinarian") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "Pet"("id_pet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "Service"("id_service") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_id_entry_fkey" FOREIGN KEY ("id_entry") REFERENCES "Entry"("id_entry") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "Question"("id_question") ON DELETE CASCADE ON UPDATE CASCADE;
