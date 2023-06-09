import { CidadeEntity as Cidade } from "../entities/cidade.entity";
import { CidadeRepository } from "../repositories/cidade.repository";

export class CidadeUseCase {
  constructor(private cidadeRepository: CidadeRepository) {}

  async criarCidade(nomeCidade: string): Promise<Cidade> {
    const novaCidade = new Cidade(nomeCidade);

    const cidadeCriada = await this.cidadeRepository.criar(novaCidade);
    return cidadeCriada;
  }

  async listandoCidade(): Promise<Cidade[]> {
    const cidades = await this.cidadeRepository.listar();

    return cidades;
  }

  async buscarCidadePorId(id: string): Promise<Cidade | null> {
    const cidade = await this.cidadeRepository.buscarPorId(id);

    return cidade;
  }

  async atualizandoCidade(
    id: string,
    nomeCidade: string
  ): Promise<Cidade | null> {
    const cidadeExiste = await this.cidadeRepository.buscarPorId(id);

    if (!cidadeExiste) {
      throw Error("Cidade não existe");
    }

    const cidadeAtualizada = new Cidade(nomeCidade);
    const cidadeAtualizadaResult = await this.cidadeRepository.atualizar(
      id,
      cidadeAtualizada
    );

    return cidadeAtualizadaResult;
  }

  async deletarCidade(id: string): Promise<void> {
    const cidadeExistente = await this.cidadeRepository.buscarPorId(id);
    if (!cidadeExistente) {
      throw new Error("Cidade não existe");
    }

    await this.cidadeRepository.deletar(id);
  }
}
