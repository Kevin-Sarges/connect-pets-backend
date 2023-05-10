import { Request, Response } from "express";
import { UsuariosUsecase } from "../domain/usecases/usuario.usecase";
import { Usuario } from "../domain/entities/usuarios.entity";

export class UsuaruisController {
  private usuariosController: UsuariosUsecase;

  constructor(usuariosController: UsuariosUsecase) {
    this.usuariosController = usuariosController;
  }

  async getUsuarios(req: Request, res: Response): Promise<void> {
    const usuarios: Usuario[] = await this.usuariosController.getUsusarios();

    res.json(usuarios).status(200);
  }

  async getUsuarioById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const usuario: Usuario | null =
      await this.usuariosController.getUsuarioById(id);

    res.json(usuario).status(200);
  }

  async createUsuario(req: Request, res: Response): Promise<void> {
    const {
      id,
      email,
      id_cidade,
      nome_doador,
      created_at,
      updated_at,
    }: Usuario = req.body;

    const usuario: Usuario | null = await this.usuariosController.createUsuario(
      {
        id,
        email,
        id_cidade,
        nome_doador,
        created_at,
        updated_at,
      }
    );

    res.json(usuario).status(200);
  }
}
