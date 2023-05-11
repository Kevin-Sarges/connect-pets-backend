import { v4 as uuidv4 } from "uuid";

export class CidadeEntity {
  public readonly id: string;
  public nome_cidade: string;

  constructor(nome_cidade: string, id?: string) {
    this.id = id || uuidv4();
    this.nome_cidade = nome_cidade;
  }
}
