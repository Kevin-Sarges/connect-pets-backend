import express from "express";
import cors from "cors";
import { route } from "./routes/index.routes";
import { createConnection } from "./database/client";

const app = express();

app.use(cors());
app.use(express.json());

createConnection().then(() => {
  app.use(route);
});

export default app;
