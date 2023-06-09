import { PrismaClient, Postagens as PrismaPostagem } from "@prisma/client";
import { PostagemEntity } from "../entities/postagem.entity";

export class PostagemRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapToPostagem(prismaPostagem: PrismaPostagem) {
    const {
      id_postagem,
      nome_pet,
      sexo_pet,
      idade_pet,
      imagem_pet,
      id_usuario,
      created_at,
      updated_at,
    }: PrismaPostagem = prismaPostagem;

    return new PostagemEntity(
      id_postagem,
      nome_pet,
      sexo_pet,
      imagem_pet,
      idade_pet,
      id_usuario,
      created_at,
      updated_at
    );
  }

  async criandoPostagem(postagem: PostagemEntity): Promise<PostagemEntity> {
    const { id, idade_pet, nome_pet, sexo_pet, imagem_pet, usuarioId } =
      postagem;

    const prismaPostagem = await this.prisma.postagens.create({
      data: {
        id_postagem: id,
        nome_pet,
        idade_pet,
        sexo_pet,
        id_usuario: usuarioId,

        imagem_pet,
      },
    });

    return this.mapToPostagem(prismaPostagem);
  }

  async buscarPostagens(): Promise<PrismaPostagem[]> {
    const prismaPostagem = await this.prisma.postagens.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        usuario: true,
      },
    });

    return prismaPostagem;
  }

  async buscarPostagemPorId(id: string): Promise<PrismaPostagem | null> {
    const prismaPostagem = await this.prisma.postagens.findUnique({
      where: { id_postagem: id },
      include: {
        usuario: true,
      },
    });

    if (!prismaPostagem) {
      return null;
    }

    return prismaPostagem;
  }

  async atualizarPostagem(
    id: string,
    postagem: PostagemEntity
  ): Promise<PostagemEntity | null> {
    const { nome_pet, sexo_pet, idade_pet, imagem_pet } = postagem;

    const prismaPostagem = await this.prisma.postagens.update({
      where: { id_postagem: id },
      data: {
        nome_pet,
        sexo_pet,
        idade_pet,
        imagem_pet,
      },
    });

    if (!prismaPostagem) {
      return null;
    }

    return this.mapToPostagem(prismaPostagem);
  }

  async deletarPostagem(id: string): Promise<boolean> {
    const deletarPostagem = await this.prisma.postagens.delete({
      where: { id_postagem: id },
    });

    return !!deletarPostagem;
  }
}
