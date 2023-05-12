export class UsuarioEntity {
  constructor(
    public id: string,
    public nome_doador: string,
    public email: string,
    public password: string,
    public cidadeId: string
  ) {}
}
