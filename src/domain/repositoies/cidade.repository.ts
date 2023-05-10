import { PrismaClient } from "@prisma/client";
import { CidadeEntity as Cidade } from "../entities/cidade.entity";

const prisma = new PrismaClient();

export class CidadeRepository {
  async criar(cidade: Cidade): Promise<Cidade> {
    const novaCidade = await prisma.cidades.create({
      data: {
        id: cidade.id,
        nome_cidade: cidade.nome_cidade,
      },
    });

    return novaCidade;
  }

  async listar(): Promise<Cidade[]> {
    const cidade = await prisma.cidades.findMany();

    return cidade;
  }

  async buscarPorId(id: string): Promise<Cidade | null> {
    const cidade = await prisma.cidades.findUnique({ where: { id } });

    return cidade;
  }

  async atualizar(id: string, cidade: Cidade): Promise<Cidade | null> {
    const atualizarCidade = await prisma.cidades.update({
      where: { id },
      data: {
        nome_cidade: cidade.nome_cidade,
      },
    });

    return atualizarCidade;
  }

  async deletar(id: string): Promise<void> {
    await prisma.cidades.delete({ where: { id } });
  }
}
