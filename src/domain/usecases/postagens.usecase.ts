import { Postagens } from "../entities/postagens.entity";
import { PostagensRepository } from "../repositoies/postagens.repository";

export class PostagenUsecase {
  private postagemRepository: PostagensRepository;

  constructor(postegemRepository: PostagensRepository) {
    this.postagemRepository = postegemRepository;
  }

  async getPostagens(): Promise<Postagens[]> {
    return this.postagemRepository.findAll();
  }

  async createPostagem(data: Postagens): Promise<Postagens | null> {
    return this.postagemRepository.create(data);
  }

  async updatePostagens(
    id: string,
    data: Postagens
  ): Promise<Postagens | null> {
    return this.postagemRepository.update(id, data);
  }

  async deletePostagem(id: string): Promise<boolean> {
    return this.postagemRepository.delete(id);
  }
}
