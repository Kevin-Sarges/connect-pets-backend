import { Usuarios } from "./Usuarios_entity";

export interface Cidade {
  id: string;
  nome_cidade: string;
  usuarios: Usuarios[];
}
