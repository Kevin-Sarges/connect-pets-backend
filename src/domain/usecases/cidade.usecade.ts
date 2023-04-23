import { Cidade } from "../entities/cidade.entity";
import { CidadeRepository } from "../repositoies/cidade.repository";

export class CidadeUsecase {
  private cidadeRepository: CidadeRepository;

  constructor(cidadeRepository: CidadeRepository) {
    this.cidadeRepository = cidadeRepository;
  }

  async getCidade(): Promise<Cidade[]> {
    return this.cidadeRepository.findAll();
  }

  async getUserById(id: string): Promise<Cidade | null> {
    return this.cidadeRepository.findById(id);
  }

  async createCidade(data: Cidade): Promise<Cidade> {
    return this.cidadeRepository.create(data);
  }

  async updateCidade(id: string, data: Cidade): Promise<Cidade | null> {
    return this.cidadeRepository.update(id, data);
  }

  async deleteCidade(id: string): Promise<boolean> {
    return this.cidadeRepository.delete(id);
  }
}
