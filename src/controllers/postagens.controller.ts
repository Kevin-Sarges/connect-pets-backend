import { Request, Response } from "express";
import { PostagenUsecase } from "../domain/usecases/postagens.usecase";
import { Postagens } from "../domain/entities/postagens.entity";

export class PostagemController {
  private postagensUsecase: PostagenUsecase;

  constructor(postagensUseCase: PostagenUsecase) {
    this.postagensUsecase = postagensUseCase;
  }

  async getPostagens(req: Request, res: Response): Promise<void> {
    const postagens: Postagens[] = await this.postagensUsecase.getPostagens();

    res.json(postagens).status(200);
  }

  async createPostagen(req: Request, res: Response): Promise<void> {
    const id_usuario: string = req.params.id;
    const { id, nome_doador, nome_pets }: Postagens = req.body;

    const postagem: Postagens | null =
      await this.postagensUsecase.createPostagem({
        id,
        id_usuario,
        nome_doador,
        nome_pets,
      });

    res.json(postagem).status(200);
  }

  async updatePostagem(req: Request, res: Response): Promise<void> {
    const { id, id_usuario } = req.params;
    const { nome_doador, nome_pets }: Postagens = req.body;

    const postagem: Postagens | null =
      await this.postagensUsecase.updatePostagens(id, {
        id,
        id_usuario,
        nome_doador,
        nome_pets,
      });

    res.json(postagem).status(200);
  }

  async deletePostagem(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    const deleted: Boolean = await this.postagensUsecase.deletePostagem(id);

    if (!deleted) {
      res.status(404).end();
      return;
    }

    res.status(204).end();
  }
}
