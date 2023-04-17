import { Request, Response } from "express";
import { prismaClient } from "../database/client";

export class GetUsers {
  async get(req: Request, res: Response) {
    const result = await prismaClient.user.findMany();

    return res.json(result);
  }
}
