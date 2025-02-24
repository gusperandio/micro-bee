import { PrismaClient } from "@prisma/client";
import { NewsType } from "../types/News";

const prisma = new PrismaClient();

// export const createNews = async (data: NewsType): Promise<NewsType> => {
//   return prisma.news.create({ data });
// };

// export const getNewsById = async (id: number): Promise<NewsType | null> => {
//   return prisma.news.findUnique({ where: { id } });
// };

// export const updateNews = async (
//   id: number,
//   data: Partial<NewsType>
// ): Promise<NewsType> => {
//   return prisma.news.update({ where: { id }, data });
// };

// export const deleteNews = async (id: number): Promise<NewsType> => {
//   return prisma.news.delete({ where: { id } });
// };
