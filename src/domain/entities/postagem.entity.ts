export class PostagemEntity {
  constructor(
    public id: string,
    public nome_pet: string,
    public sexo_pet: string,
    public imagem_pet: string,
    public idade_pet: string,
    public usuarioId: string
  ) {}
}
