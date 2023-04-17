import { Router } from "express";
import { CreateUse } from "../controllers/CreateUser";
import { GetUsers } from "../controllers/GetUsers";

const route = Router();
const createUser = new CreateUse();
const getUsers = new GetUsers();

route.get("/users", getUsers.get);
route.post("/create-user", createUser.create);

export { route };
