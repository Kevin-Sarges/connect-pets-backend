import { UsuarioEntity as Usuario } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repositoies/usuario.repository";

export class UsuariosUseCase {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.criarUsuario(usuario);
  }

  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.usuarioRepository.buscarUsuarioPorId(id);
  }

  async buscarUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.buscarUsuarios();
  }

  async atualizarUsuario(
    id: string,
    usuario: Usuario
  ): Promise<Usuario | null> {
    return this.usuarioRepository.atualizarUsuario(id, usuario);
  }

  async deletarUsuario(id: string): Promise<boolean> {
    return this.usuarioRepository.deletarUsuario(id);
  }
}
