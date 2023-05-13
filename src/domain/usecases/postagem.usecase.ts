import { PostagemEntity } from "../entities/postagem.entity";
import { PostagemRepository } from "../repositories/postagem.repository";

export class PostagemUseCase {
  private postagemRepository: PostagemRepository;

  constructor(postagemRepository: PostagemRepository) {
    this.postagemRepository = postagemRepository;
  }

  async criarPostagem(postagem: PostagemEntity): Promise<PostagemEntity> {
    return this.postagemRepository.criandoPostagem(postagem);
  }

  async buscarPostagens(): Promise<PostagemEntity[]> {
    return this.postagemRepository.buscarPostagens();
  }

  async buscarPostagemPoId(id: string): Promise<PostagemEntity | null> {
    return this.postagemRepository.buscarPostagemPorId(id);
  }

  async buscarPostagensPorUsuario(
    usuarioId: string
  ): Promise<PostagemEntity[]> {
    return this.postagemRepository.buscandoPostagemPorUsuario(usuarioId);
  }

  async atualizarPostagem(
    id: string,
    postagem: PostagemEntity
  ): Promise<PostagemEntity | null> {
    return this.postagemRepository.atualizarPostagem(id, postagem);
  }

  async deletarPostagem(id: string): Promise<boolean> {
    return this.postagemRepository.deletarPostagem(id);
  }
}
