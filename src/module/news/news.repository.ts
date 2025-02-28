import { PrismaClient } from "@prisma/client";
import {
  CreateNewsInput,
  UpdateNewsInput,
  AiVerificationTextInput,
} from "./news.schema";

const prisma = new PrismaClient();

export async function findNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id },
  });
}

export async function findAllNews() {
  return prisma.news.findMany();
}

export async function insertNews(data: CreateNewsInput) {
  // return prisma.news.create({
  //   data,
  // });
}

export async function updateNews(id: number, data: UpdateNewsInput) {
  return prisma.news.update({
    where: { id },
    data,
  });
}

export async function deleteNews(id: number) {
  return prisma.news.delete({
    where: { id },
  });
}

export async function findNewsByUserId(userId: number) {
  return prisma.news.findMany({
    where: { userId },
  });
}

export async function validateAI(data: AiVerificationTextInput) {
  return { verify: true };
}
