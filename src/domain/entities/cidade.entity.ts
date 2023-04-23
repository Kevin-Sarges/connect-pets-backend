import { Usuarios } from "@prisma/client";

export interface Cidade {
  id: string;
  nome_cidade: string;
  usuarios?: Usuarios[];
}
