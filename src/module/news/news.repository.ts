import { News as NewsPrisma, PrismaClient } from "@prisma/client";
import {
  CreateNewsInput,
  UpdateNewsInput,
  AiVerificationTextInput,
} from "./news.schema";
import { readTime } from "./news.service";

const prisma = new PrismaClient();

export async function findNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });
}

export async function findAllNews(): Promise<NewsPrisma[]> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 3);

    const allNews = await prisma.news.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        tags: true,
      },
    });

    return allNews ? allNews : [];
  } catch (error) {
    return [];
  }
}

export async function findNewsByUserId(userId: number): Promise<NewsPrisma[]> {
  try {
    const newsByUser = await prisma.news.findMany({
      where: { userId },
      include: {
        tags: true,
      },
    });

    return newsByUser ? newsByUser : [];
  } catch (error) {
    console.error("Erro", error);
    return [];
  }
}

export const insertNews = async (
  data: CreateNewsInput
): Promise<NewsPrisma | null> => {
  try {
    const newPost = await prisma.news.create({
      data: {
        title: data.title!,
        argument: data.argument!,
        tags: {
          connect: data.tags.map((tag) => ({ id: tag.id })),
        },
        userId: data.userId,
        important: data.important!,
        minReads: readTime(data.argument!),
        aiValidate: true,
        cape: data.cape!,
        photo1: data.photo1!,
        photo2: data.photo2!,
        photo3: data.photo3!,
      },
    });

    if (!newPost) {
      throw new Error("Erro ao publicar seu conteúdo");
    }

    return newPost;
  } catch (error) {
    console.error("Erro", error);
    return null;
  }
};

export async function updateNews(id: number, data: UpdateNewsInput) {
  const updateData = {
    title: data.title,
    argument: data.argument,
    important: data.important,
    cape: data.cape,
    photo1: data.photo1,
    photo2: data.photo2,
    photo3: data.photo3,
    ...(data.tags && {
      tags: {
        set: data.tags.map((tag) => ({ id: tag.id })),
      },
    }),
  };

  return prisma.news.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteNews(id: number) {
  try {
    return prisma.news.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro", error);
    return null;
  }
}

export async function validateAI(data: AiVerificationTextInput) {
  return { verify: true };
}
