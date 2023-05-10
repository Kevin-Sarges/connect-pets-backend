export class CidadeEntity {
  id: string;
  nome_cidade: string;

  constructor(id: string, nome_cidade: string) {
    (this.id = id), (this.nome_cidade = nome_cidade);
  }
}
