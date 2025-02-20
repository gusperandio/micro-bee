import { PrismaClient, Roles } from "@prisma/client";
import { UserType } from "../types/User";

const prisma = new PrismaClient();

export const createUser = async (data: UserType): Promise<boolean> => {
  try {
    const newUser = prisma.user.create({
      data: {
        name: data.name,
        password: data.password ?? "",
        email: data.email,
        age: data.age,
        socialAuth: false,
        premiumTime: data.premiumTime ?? null,
        lastLogin: new Date(),
        roles: {
          connect: [{ name: Roles.USER }],
        },
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getNewsById = async (id: number): Promise<NewsType | null> => {
  return prisma.news.findUnique({ where: { id } });
};

export const updateNews = async (
  id: number,
  data: Partial<NewsType>
): Promise<NewsType> => {
  return prisma.news.update({ where: { id }, data });
};

export const deleteNews = async (id: number): Promise<NewsType> => {
  return prisma.news.delete({ where: { id } });
};
