import { Usuario } from "../entities/usuarios.entity";
import { UsuarioRepository } from "../repositoies/usuario.repository";

export class UsuariosUsecase {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async getUsusarios(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async getUsuarioById(id: string): Promise<Usuario | null> {
    return this.usuarioRepository.findById(id);
  }

  async createUsuario(data: Usuario): Promise<Usuario> {
    return this.usuarioRepository.create(data);
  }

  async upddateUsuario(id: string, data: Usuario): Promise<Usuario | null> {
    return this.usuarioRepository.update(id, data);
  }

  async deleteUsuario(id: string): Promise<boolean> {
    return this.usuarioRepository.delete(id);
  }
}
