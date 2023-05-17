/*
  Warnings:

  - Added the required column `imagem_pet` to the `postagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postagens" ADD COLUMN     "imagem_pet" TEXT NOT NULL;
