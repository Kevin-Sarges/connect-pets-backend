/*
  Warnings:

  - You are about to drop the `Cidades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cidades";

-- CreateTable
CREATE TABLE "cidades" (
    "id" TEXT NOT NULL,
    "nome_cidade" TEXT NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_cidade" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_cidade_fkey" FOREIGN KEY ("id_cidade") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
