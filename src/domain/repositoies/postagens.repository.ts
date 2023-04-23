import { PrismaClient, Postagens as PrismaPostagens } from "@prisma/client";
import { Postagens } from "../entities/postagens.entity";

export class PostagensRepository {
  private prisma: PrismaClient;

  private mapToEntity(postagens: PrismaPostagens): Postagens {
    return {
      id: postagens.id,
      nome_doador: postagens.nome_doador,
      nome_pets: postagens.nome_pets,
      id_usuario: postagens.id_usuario,
    };
  }

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Postagens[]> {
    const postagen: PrismaPostagens[] = await this.prisma.postagens.findMany();

    return postagen.map((map) => this.mapToEntity(map));
  }

  async create(data: Postagens): Promise<Postagens | null> {
    const postagen: PrismaPostagens = await this.prisma.postagens.create({
      data: {
        nome_doador: data.nome_doador,
        nome_pets: data.nome_pets,
        id_usuario: data.id_usuario,
      },
    });

    return this.mapToEntity(postagen);
  }

  async update(
    id: string,
    data: Partial<Postagens>
  ): Promise<Postagens | null> {
    const postagen: PrismaPostagens = await this.prisma.postagens.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return this.mapToEntity(postagen);
  }

  async delete(id: string): Promise<boolean> {
    const postagen: PrismaPostagens | null = await this.prisma.postagens.delete(
      {
        where: {
          id,
        },
      }
    );

    return !!postagen;
  }
}
