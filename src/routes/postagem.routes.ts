import { Router } from "express";
import { PostagemRepository } from "../domain/repositories/postagem.repository";
import { PostagemUseCase } from "../domain/usecases/postagem.usecase";
import { PostagemController } from "../controllers/postagem.controller";

const postagemRoutes = Router();

const postagemRepository = new PostagemRepository();
const postagemUsecase = new PostagemUseCase(postagemRepository);
const postagemController = new PostagemController(postagemUsecase);

postagemRoutes.post(
  "/usuarios/usuario/:id_usuario/posatgem/criando_postagem",
  postagemController.criandoPostagem.bind(postagemController)
);
postagemRoutes.get(
  "/postagens",
  postagemController.buscarPostagens.bind(postagemController)
);
postagemRoutes.get(
  "/postagens/postagem/:id",
  postagemController.buscarPostagemPorId.bind(postagemController)
);
postagemRoutes.put(
  "/usuarios/usuario/:id_usuario/posatgens/postagem/:id",
  postagemController.atualizandoPostagem.bind(postagemController)
);
postagemRoutes.delete(
  "/postagens/postagem/delete/:id",
  postagemController.deletarPostagem.bind(postagemController)
);

export default postagemRoutes;
