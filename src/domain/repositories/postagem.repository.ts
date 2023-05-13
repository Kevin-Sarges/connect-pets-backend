import {
  Postagens,
  PrismaClient,
  Postagens as PrismaPostagem,
} from "@prisma/client";
import { PostagemEntity } from "../entities/postagem.entity";

export class PostagemRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapToPostagem(prismaPostagem: PrismaPostagem) {
    const { id_postagem, nome_pet, sexo_pet, idade_pet, id_usuario } =
      prismaPostagem;

    return new PostagemEntity(
      id_postagem,
      nome_pet,
      sexo_pet,
      idade_pet,
      id_usuario
    );
  }

  async criandoPostagem(postagem: PostagemEntity): Promise<PostagemEntity> {
    const { id, idade_pet, nome_pet, sexo_pet, usuarioId } = postagem;

    const prismaPostagem = await this.prisma.postagens.create({
      data: {
        nome_pet,
        idade_pet,
        sexo_pet,
        id_usuario: usuarioId,
      },
    });

    return this.mapToPostagem(prismaPostagem);
  }

  async buscarPostagemPorId(id: string): Promise<PostagemEntity | null> {
    const prismaPostagem = await this.prisma.postagens.findUnique({
      where: { id_postagem: id },
    });

    if (!prismaPostagem) {
      return null;
    }

    return this.mapToPostagem(prismaPostagem);
  }

  async buscandoPostagemPorUsuario(
    usuarioId: string
  ): Promise<PostagemEntity[]> {
    const prismaPostagem = await this.prisma.postagens.findMany({
      where: { id_usuario: usuarioId },
    });

    return prismaPostagem.map(this.mapToPostagem);
  }

  async atualizarPostagem(
    id: string,
    postagem: PostagemEntity
  ): Promise<PostagemEntity | null> {
    const { nome_pet, sexo_pet, idade_pet } = postagem;

    const prismaPostagem = await this.prisma.postagens.update({
      where: { id_postagem: id },
      data: {
        nome_pet,
        sexo_pet,
        idade_pet,
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