export class UsuarioEntity {
  constructor(
    public nome_doador: string,
    public email: string,
    public numero_doador: string,
    public cidadeId: string
  ) {}
}
