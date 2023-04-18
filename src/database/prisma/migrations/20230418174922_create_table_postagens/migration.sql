-- CreateTable
CREATE TABLE "Postagens" (
    "id" TEXT NOT NULL,
    "nome_pets" TEXT NOT NULL,
    "nome_doador" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Postagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Postagens" ADD CONSTRAINT "Postagens_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
