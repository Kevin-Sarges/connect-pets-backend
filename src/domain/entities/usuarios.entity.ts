import { Postagens } from "./postagens.entity";

export interface Usuario {
  id: string;
  nome_doador: string;
  email: string;
  id_cidade: string;
  created_at: Date;
  updated_at: Date;
  postagens?: Postagens[];
}
