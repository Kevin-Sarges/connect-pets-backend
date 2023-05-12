import express from "express";
import cors from "cors";
import { CidadeRoutes, UsuarioRoutes } from "./routes";
import { createConnection } from "./database/client";

const app = express();

app.use(cors());
app.use(express.json());

createConnection().then(() => {
  app.use(CidadeRoutes);
  app.use(UsuarioRoutes);
});

export default app;
