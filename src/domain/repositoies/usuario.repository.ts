import { Usuarios as PrismaUsuarios, PrismaClient } from "@prisma/client";
import { Usuario } from "../entities/usuarios.entity";

export class UsuarioRepository {
  private prisma: PrismaClient;

  private mapToEntity(usuario: PrismaUsuarios): Usuario {
    return {
      id: usuario.id,
      nome_doador: usuario.nome_usuario,
      email: usuario.email,
      id_cidade: usuario.id_cidade,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
    };
  }

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Usuario[]> {
    const usuario: PrismaUsuarios[] = await this.prisma.usuarios.findMany();

    return usuario.map((usuario) => this.mapToEntity(usuario));
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuario: PrismaUsuarios | null =
      await this.prisma.usuarios.findUnique({
        where: {
          id,
        },

        include: {
          postages: true,
        },
      });

    if (!usuario) {
      return null;
    }

    return this.mapToEntity(usuario);
  }

  async create(data: Usuario): Promise<Usuario> {
    const usuario: PrismaUsuarios = await this.prisma.usuarios.create({
      data: {
        nome_usuario: data.nome_doador,
        email: data.email,
        id_cidade: data.id_cidade,
      },
    });

    return this.mapToEntity(usuario);
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
    const usuario: PrismaUsuarios = await this.prisma.usuarios.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return this.mapToEntity(usuario);
  }

  async delete(id: string): Promise<boolean> {
    const usuario: PrismaUsuarios | null = await this.prisma.usuarios.delete({
      where: {
        id,
      },
    });

    return !!usuario;
  }
}
