import { Router } from "express";
import { UsuarioController } from "../../controllers/usuarios.controller";
import { UsuariosUseCase } from "../../domain/usecases/usuarios.usecase";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository";

const usuarioRoutes = Router();

const usuarioRepository = new UsuarioRepository();
const usuarioUseCase = new UsuariosUseCase(usuarioRepository);
const usuarioController = new UsuarioController(usuarioUseCase);

usuarioRoutes.post(
  "/cidades/cidade/:cidadeId/criando-usuario",
  usuarioController.criarUsuario.bind(usuarioController)
);
usuarioRoutes.get(
  "/usuarios",
  usuarioController.buscarUsuarios.bind(usuarioController)
);
usuarioRoutes.get(
  "/usuarios/usuario/:id",
  usuarioController.buscarUsuarioPorId.bind(usuarioController)
);
usuarioRoutes.put(
  "/cidades/cidade/:cidadeId/usuarios/usuario/atualizar/:id",
  usuarioController.atualizarUsuario.bind(usuarioController)
);
usuarioRoutes.delete(
  "/usuarios/usuario/delete/:id",
  usuarioController.deletarUsuario.bind(usuarioController)
);

export default usuarioRoutes;
