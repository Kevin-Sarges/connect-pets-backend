import {
  Usuarios as PrismaUsuario,
  PrismaClient,
  Cidades as PrismaCidade,
} from "@prisma/client";
import { UsuarioEntity as Usuario } from "../entities/usuario.entity";
import { CidadeEntity as Cidade } from "../entities/cidade.entity";

export class UsuarioRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async mapToUsuario(prismaUsuario: PrismaUsuario): Promise<Usuario> {
    const { id, nome_doador, email, password, cidadeId } = prismaUsuario;
    let cidadeEntity: Cidade | undefined;

    if (cidadeId) {
      const cidade = await this.prisma.cidades.findUnique({
        where: { id: cidadeId },
      });

      if (cidade) {
        const { id: cidadeId, nome_cidade } = cidade;
        cidadeEntity = new Cidade(cidadeId, nome_cidade);
      }
    }

    return new Usuario(id, nome_doador, email, password, cidadeEntity!);
  }

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    const { id, email, nome_doador, password, cidade } = usuario;

    const prismaUsuario = await this.prisma.usuarios.create({
      data: {
        nome_doador,
        email,
        password,
        cidade: { connect: { id: cidade.id } },
      },
    });

    return this.mapToUsuario(prismaUsuario);
  }

  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    const prismaUsuario = await this.prisma.usuarios.findUnique({
      where: {
        id,
      },
    });

    if (!prismaUsuario) {
      return null;
    }

    return this.mapToUsuario(prismaUsuario);
  }

  async buscarUsuarios(): Promise<Usuario[]> {
    const prismaUsuarios = await this.prisma.usuarios.findMany();

    return Promise.all(prismaUsuarios.map(this.mapToUsuario));
  }

  async atualizarUsuario(
    id: string,
    usuario: Usuario
  ): Promise<Usuario | null> {
    const { nome_doador, email, password, cidade } = usuario;

    const prismaUsuario = await this.prisma.usuarios.update({
      where: { id },
      data: {
        nome_doador,
        email,
        password,
        cidade: { connect: { id: cidade.id } },
      },
    });

    if (!prismaUsuario) {
      return null;
    }

    return this.mapToUsuario(prismaUsuario);
  }

  async deletarUsuario(id: string): Promise<boolean> {
    const deletarUser = await this.prisma.usuarios.delete({ where: { id } });

    return !!deletarUser;
  }
}
