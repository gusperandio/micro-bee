import { News as NewsPrisma } from "@prisma/client";
import {
  CreateNewsInput,
  UpdateNewsInput,
  AiVerificationTextInput,
} from "./news.schema";
import { readTime } from "./news.service";
import prisma from "../../util/prisma";

export async function findNewsById(id: number): Promise<NewsPrisma | null> {
  try {
    return await prisma.news.findUnique({
      where: { id },
      include: { tags: true },
    });
  } catch (error) {
    console.error("Erro ao buscar notícia por ID:", error);
    throw new Error("Erro ao buscar notícia");
  }
}
 
export async function findAllNews(days: number = 3): Promise<NewsPrisma[]> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.news.findMany({
      where: { createdAt: { gte: startDate } },
      include: { tags: true },
    });
    
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    throw new Error("Erro ao buscar notícias");
  }
}


export async function findNewsByUserId(userId: number): Promise<NewsPrisma[]> {
  try {
    return await prisma.news.findMany({
      where: { userId },
      include: { tags: true },
    });
  } catch (error) {
    console.error("Erro ao buscar notícias do usuário:", error);
    throw new Error("Erro ao buscar notícias do usuário");
  }
}

export async function insertNews(data: CreateNewsInput): Promise<NewsPrisma> {
  try {
    const newPost = await prisma.news.create({
      data: {
        title: data.title,
        argument: data.argument,
        tags: { connect: data.tags.map((tag) => ({ id: tag.id })) },
        userId: data.userId,
        important: data.important,
        minReads: readTime(data.argument),
        aiValidate: true,
        cape: data.cape,
        photo1: data.photo1,
        photo2: data.photo2,
        photo3: data.photo3,
      },
    });

    return newPost;
  } catch (error) {
    console.error("Erro ao inserir notícia:", error);
    throw new Error("Erro ao publicar seu conteúdo");
  }
}

export async function updateNews(
  id: number,
  data: UpdateNewsInput
): Promise<NewsPrisma> {
  try {
    const updateData: Partial<NewsPrisma> = {
      title: data.title,
      argument: data.argument,
      important: data.important,
      cape: data.cape,
      photo1: data.photo1,
      photo2: data.photo2,
      photo3: data.photo3,
      ...(data.tags && {
        tags: { set: data.tags.map((tag) => ({ id: tag.id })) },
      }),
    };

    return await prisma.news.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    throw new Error("Erro ao atualizar notícia");
  }
}
 
export async function deleteNews(id: number): Promise<NewsPrisma | null> {
  try {
    return await prisma.news.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar notícia:", error);
    throw new Error("Erro ao deletar notícia");
  }
}
 
export async function validateAI(
  data: AiVerificationTextInput
): Promise<{ verify: boolean }> {
  return { verify: true };
}
