import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { PostagemUseCase } from "../domain/usecases/postagem.usecase";
import { PostagemEntity } from "../domain/entities/postagem.entity";

export class PostagemController {
  private postgemUseCase: PostagemUseCase;

  constructor(postagemUsecase: PostagemUseCase) {
    this.postgemUseCase = postagemUsecase;
  }

  async criandoPostagem(req: Request, res: Response): Promise<void> {
    try {
      const id = uuidv4();
      const { id_usuario } = req.params;
      const { nome_pet, sexo_pet, idade_pet }: PostagemEntity = req.body;

      const postagem = new PostagemEntity(
        id,
        nome_pet,
        sexo_pet,
        idade_pet,
        id_usuario
      );

      const criandoPostagem = await this.postgemUseCase.criarPostagem(postagem);

      res.json(criandoPostagem).status(201);
    } catch (error) {
      res.json({ erro: "Erro ao criar a postagem" }).status(500);
    }
  }

  async buscarPostagens(req: Request, res: Response): Promise<void> {
    try {
      const postagem = await this.postgemUseCase.buscarPostagens();

      res.json(postagem).status(200);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar postagem" });
    }
  }

  async buscarPostagemPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const postagem = await this.postgemUseCase.buscarPostagemPoId(id);

      if (!postagem) {
        res.status(404).json({ erro: "Postagem não encotrada" });
        return;
      }

      res.json(postagem).status(200);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar postagem" });
    }
  }

  async buscarPostagemPorUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params;

      const postagem = await this.postgemUseCase.buscarPostagensPorUsuario(
        id_usuario
      );

      if (!postagem) {
        res.status(404).json({ erro: "Postagem não encotrada" });
        return;
      }

      res.status(200).json(postagem);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar postagem" });
    }
  }

  async atualizandoPostagem(req: Request, res: Response): Promise<void> {
    try {
      const { id, id_usuario } = req.params;
      const { nome_pet, sexo_pet, idade_pet }: PostagemEntity = req.body;

      const postagem = new PostagemEntity(
        id,
        nome_pet,
        sexo_pet,
        idade_pet,
        id_usuario
      );

      const postatgemAtualizada = await this.postgemUseCase.atualizarPostagem(
        id,
        postagem
      );

      if (!postatgemAtualizada) {
        res.status(404).json({ erro: "Postagem não encontrada" });
        return;
      }

      res.status(200).json(postatgemAtualizada);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar postagem" });
    }
  }

  async deletarPostagem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const postagem = await this.postgemUseCase.deletarPostagem(id);

      if (!postagem) {
        res.status(404).json({ error: "Postagem não encontrada" });
        return;
      }

      res.status(204).json({ message: "Postagem excluida" }).end();
    } catch (error) {
      res.status(500).json({ erro: "Erro ao deletar postagem" });
    }
  }
}
