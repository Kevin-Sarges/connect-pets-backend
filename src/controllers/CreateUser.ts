import { prismaClient } from "../database/client";
import { Request, Response } from "express";

export class CreateUse {
  async create(req: Request, res: Response) {
    const { name, email, password, city } = req.body;

    const createUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        city,
      },
    });

    return res.json(createUser);
  }
}
