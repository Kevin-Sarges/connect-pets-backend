-- CreateTable
CREATE TABLE "postagens" (
    "id_postagem" TEXT NOT NULL,
    "nome_pet" TEXT NOT NULL,
    "sexo_pet" TEXT NOT NULL,
    "idade_pet" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "postagens_pkey" PRIMARY KEY ("id_postagem")
);

-- AddForeignKey
ALTER TABLE "postagens" ADD CONSTRAINT "postagens_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
