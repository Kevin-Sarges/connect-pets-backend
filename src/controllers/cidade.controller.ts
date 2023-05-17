import { Request, Response } from "express";
import { CidadeUseCase } from "../domain/usecases/cidade.usecase";
import { CidadeEntity as Cidade } from "../domain/entities/cidade.entity";

export class CidadeController {
  constructor(private cidadeUseCase: CidadeUseCase) {}

  async criarCidade(req: Request, res: Response) {
    try {
      const { nome_cidade }: Cidade = req.body;
      const cidadeCriada = await this.cidadeUseCase.criarCidade(nome_cidade);

      res.json(cidadeCriada).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error ao criar a cidade" });
    }
  }

  async listarCidades(req: Request, res: Response) {
    try {
      const cidades = await this.cidadeUseCase.listandoCidade();

      res.status(200).json(cidades);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao listar as cidades" });
    }
  }

  async buscarCidadePorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cidade = await this.cidadeUseCase.buscarCidadePorId(id);

      if (cidade) {
        res.json(cidade);
      } else {
        res.status(400).json({ message: "Cidade não entrada !!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao lista a cidade" });
    }
  }

  async atualiarCidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome_cidade }: Cidade = req.body;

      const cidadeAtualiada = await this.cidadeUseCase.atualizandoCidade(
        id,
        nome_cidade
      );
      if (cidadeAtualiada) {
        res.json(cidadeAtualiada);
      } else {
        res.status(400).json({ message: "Cidade não encontrada" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ erro: "Erro ao atualizar a cidade" });
    }
  }

  async deletarCidade(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.cidadeUseCase.deletarCidade(id);
      res.json({ message: "Cidade deletada com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ erro: "Erro ao deletar a cidade" });
    }
  }
}
