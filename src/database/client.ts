import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const createConnection = async () => {
  await prismaClient.$connect();
};

export const closeConnection = async () => {
  await prismaClient.$disconnect();
};

export { prismaClient };
