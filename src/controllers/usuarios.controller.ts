import { Request, Response } from "express";
import { UsuarioEntity } from "../domain/entities/usuario.entity";
import { UsuariosUseCase } from "../domain/usecases/usuarios.usecase";
import { v4 as uuidv4 } from "uuid";

export class UsuarioController {
  private usuarioUseCase: UsuariosUseCase;

  constructor(usuarioUseCase: UsuariosUseCase) {
    this.usuarioUseCase = usuarioUseCase;
  }

  async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id: string = uuidv4();
      const cidadeId = req.params.cidadeId;
      const { nome_doador, email, password } = req.body;

      const novoUsuario = new UsuarioEntity(
        id,
        nome_doador,
        email,
        password,
        cidadeId
      );

      const usuarioCriado = await this.usuarioUseCase.criarUsuario(novoUsuario);

      res.status(201).json(usuarioCriado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async buscarUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const usuario = await this.usuarioUseCase.buscarUsuarioPorId(id);

      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async buscarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioUseCase.buscarUsuarios();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id, cidadeId } = req.params;
      const { nome_doador, email, password } = req.body;

      const usuarioAtualizado = new UsuarioEntity(
        id,
        nome_doador,
        email,
        password,
        cidadeId
      );

      const usuario = await this.usuarioUseCase.atualizarUsuario(
        id,
        usuarioAtualizado
      );

      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async deletarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletado = await this.usuarioUseCase.deletarUsuario(id);

      if (!deletado) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.status(204).json({ message: "Usuário deletado" }).end();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}
