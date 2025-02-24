import { PrismaClient } from "@prisma/client";
import { LogType } from "../types/Log";

const prisma = new PrismaClient();

export class LogService {
  async createLog(data: LogType) {
    const log = await prisma.log.create({
      data,
    });

    return log;
  }
}


export function sum(a: number, b: number) {
  return a + b;
}