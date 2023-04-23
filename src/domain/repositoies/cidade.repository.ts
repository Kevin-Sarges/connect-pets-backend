import { Cidades as PrismaCidades, PrismaClient } from "@prisma/client";
import { Cidade } from "../entities/cidade.entity";

export class CidadeRepository {
  private prisma: PrismaClient;

  private mapToEntity(cidade: PrismaCidades): Cidade {
    return {
      id: cidade.id,
      nome_cidade: cidade.nome_cidade,
    };
  }

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Cidade[]> {
    const cidade: PrismaCidades[] = await this.prisma.cidades.findMany();

    return cidade.map((cidade) => this.mapToEntity(cidade));
  }

  async findById(id: string): Promise<Cidade | null> {
    const cidade: PrismaCidades | null = await this.prisma.cidades.findUnique({
      where: {
        id,
      },
    });

    if (!cidade) {
      return null;
    }

    return this.mapToEntity(cidade);
  }

  async create(data: Cidade): Promise<Cidade> {
    const cidade: PrismaCidades = await this.prisma.cidades.create({
      data: {
        nome_cidade: data.nome_cidade,
      },
    });

    return this.mapToEntity(cidade);
  }

  async update(id: string, data: Partial<Cidade>): Promise<Cidade | null> {
    const cidade: PrismaCidades | null = await this.prisma.cidades.update({
      where: {
        id,
      },
      data: {
        nome_cidade: data.nome_cidade,
      },
    });

    return this.mapToEntity(cidade);
  }

  async delete(id: string): Promise<boolean> {
    const cidade: PrismaCidades | null = await this.prisma.cidades.delete({
      where: {
        id,
      },
    });

    return !!cidade;
  }
}
