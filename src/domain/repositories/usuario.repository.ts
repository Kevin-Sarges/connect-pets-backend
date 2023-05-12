import { PrismaClient, Usuarios as PrismaUsuario } from "@prisma/client";
import { UsuarioEntity } from "../entities/usuario.entity";

export class UsuarioRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapToUsuario(prismaUsuario: PrismaUsuario): UsuarioEntity {
    const { id, nome_doador, email, password, cidadeId } = prismaUsuario;
    return new UsuarioEntity(id, nome_doador, email, password, cidadeId);
  }

  async criarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const { id, nome_doador, email, password, cidadeId } = usuario;

    const prismaUsuario = await this.prisma.usuarios.create({
      data: {
        id,
        nome_doador,
        email,
        password,
        cidadeId,
      },
    });

    return this.mapToUsuario(prismaUsuario);
  }

  async buscarUsuarioPorId(id: string): Promise<UsuarioEntity | null> {
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

  async buscarUsuarios(): Promise<UsuarioEntity[]> {
    const prismaUsuarios = await this.prisma.usuarios.findMany();

    return prismaUsuarios.map(this.mapToUsuario);
  }

  async atualizarUsuario(
    id: string,
    usuario: UsuarioEntity
  ): Promise<UsuarioEntity | null> {
    const { nome_doador, email, password, cidadeId } = usuario;

    const prismaUsuario = await this.prisma.usuarios.update({
      where: { id },
      data: {
        nome_doador,
        email,
        password,
        cidadeId,
      },
    });

    if (!prismaUsuario) {
      return null;
    }

    return this.mapToUsuario(prismaUsuario);
  }

  async deletarUsuario(id: string): Promise<boolean> {
    const deletarUsuario = await this.prisma.usuarios.delete({
      where: {
        id,
      },
    });

    return !!deletarUsuario;
  }
}
