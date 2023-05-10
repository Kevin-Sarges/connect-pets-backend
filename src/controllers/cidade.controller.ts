import { Request, Response } from "express";
import { CidadeUsecase } from "../domain/usecases/cidade.usecade";
import { Cidade } from "../domain/entities/cidade.entity";

export class CidadeController {
  private cidadeUseCase: CidadeUsecase;

  constructor(cidadeUseCase: CidadeUsecase) {
    this.cidadeUseCase = cidadeUseCase;
  }

  async getCidade(req: Request, res: Response): Promise<void> {
    const cidade: Cidade[] = await this.cidadeUseCase.getCidade();

    res.json(cidade).status(200);
  }

  async getCidadeById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const cidade: Cidade | null = await this.cidadeUseCase.getUserById(id);

    res.json(cidade).status(200);
  }

  async createCidade(req: Request, res: Response): Promise<void> {
    const { nome_cidade }: Cidade = req.body;

    const cidade: Cidade = await this.cidadeUseCase.createCidade({
      nome_cidade,
    });

    res.json(cidade).status(200);
  }

  async updateCidade(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const { nome_cidade }: Cidade = req.body;

    const cidade: Cidade | null = await this.cidadeUseCase.updateCidade(id, {
      nome_cidade,
    });

    res.json(cidade).status(200);
  }

  async deleteCidade(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    const deleted: Boolean = await this.cidadeUseCase.deleteCidade(id);

    if (!deleted) {
      res.status(404).end();
      return;
    }

    res.status(204).end();
  }
}
