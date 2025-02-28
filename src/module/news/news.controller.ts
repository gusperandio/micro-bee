import { FastifyReply, FastifyRequest } from "fastify";
import {
  SearchNewsInput,
  CreateNewsInput,
  UpdateNewsInput,
  AiVerificationTextInput,
} from "./news.schema";
import {
  findNewsById,
  findAllNews,
  insertNews,
  updateNews,
  deleteNews,
  findNewsByUserId,
  validateAI,
} from "./news.repository";

export async function getNewsById(
  req: FastifyRequest<{ Params: SearchNewsInput }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const news = await findNewsById(id);
  reply.send(news);
}

export async function getAllNews(req: FastifyRequest, reply: FastifyReply) {
  const news = await findAllNews();
  reply.send(news);
}

export async function callAi(
  req: FastifyRequest<{ Body: AiVerificationTextInput }>,
  reply: FastifyReply
) {
  const { argument } = req.body;
  const result = await validateAI({ argument });
  reply.send(result);
}

export async function getNewsByUserId(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const { userId } = req.params;
  const news = await findNewsByUserId(userId);
  reply.send(news);
}

export async function createNews(
  req: FastifyRequest<{ Body: CreateNewsInput }>,
  reply: FastifyReply
) {
  const newsData = req.body;
  const news = await insertNews(newsData);
  reply.send(news);
}

export async function putNews(
  req: FastifyRequest<{ Params: { id: string }; Body: UpdateNewsInput }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const newsData = req.body;
  const updatedNews = await updateNews(id, newsData);
  reply.send(updatedNews);
}

export async function removeNews(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const deletedNews = await deleteNews(id);
  reply.send(deletedNews);
}
