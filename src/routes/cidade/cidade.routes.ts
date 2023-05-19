import { Router } from "express";
import { CidadeRepository } from "../../domain/repositories/cidade.repository";
import { CidadeUseCase } from "../../domain/usecases/cidade.usecase";
import { CidadeController } from "../../controllers/cidade.controller";

const cidadeRoutes = Router();

const cidadeRepository = new CidadeRepository();
const cidadeUseCase = new CidadeUseCase(cidadeRepository);
const cidadeController = new CidadeController(cidadeUseCase);

cidadeRoutes.post(
  "/criar-cidade",
  cidadeController.criarCidade.bind(cidadeController)
);
cidadeRoutes.get(
  "/cidades",
  cidadeController.listarCidades.bind(cidadeController)
);
cidadeRoutes.get(
  "/cidades/cidade/:id",
  cidadeController.buscarCidadePorId.bind(cidadeController)
);
cidadeRoutes.put(
  "/cidades/cidade/atualizar/:id",
  cidadeController.atualiarCidade.bind(cidadeController)
);
cidadeRoutes.delete(
  "/cidades/cidade/cidade-delete/:id",
  cidadeController.deletarCidade.bind(cidadeController)
);

export default cidadeRoutes;
