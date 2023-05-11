import { CidadeEntity as Cidade } from "./cidade.entity";

export class UsuarioEntity {
  constructor(
    public id: string,
    public nome_doador: string,
    public email: string,
    public password: string,
    public cidade: Cidade
  ) {}
}
