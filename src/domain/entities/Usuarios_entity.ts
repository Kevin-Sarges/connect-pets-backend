import { Postagens } from "./Postagens_entity";

export interface Usuarios {
  id: string;
  nome_pet: string;
  nome_doador: string;
  email: string;
  id_cidade: string;
  created_at: Date;
  updated_at: Date;
  postages: Postagens[];
}
