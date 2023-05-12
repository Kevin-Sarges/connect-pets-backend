import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class UsuariosUseCase {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async criarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    return this.usuarioRepository.criarUsuario(usuario);
  }

  async buscarUsuarioPorId(id: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.buscarUsuarioPorId(id);
  }

  async buscarUsuarios(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.buscarUsuarios();
  }

  async atualizarUsuario(
    id: string,
    usuario: UsuarioEntity
  ): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.atualizarUsuario(id, usuario);
  }

  async deletarUsuario(id: string): Promise<boolean> {
    return this.usuarioRepository.deletarUsuario(id);
  }
}
