import { PrismaClient } from "@prisma/client";
import { AwardType } from "../types/Award";

const prisma = new PrismaClient();

export const createAward = async (data: AwardType): Promise<AwardType> => {
  return prisma.award.create({ data });
};

export const getAwardById = async (id: number): Promise<AwardType | null> => {
  return prisma.award.findUnique({ where: { id } });
};

