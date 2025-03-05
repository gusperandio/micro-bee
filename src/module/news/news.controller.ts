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
  const { newsId } = req.params;
  const news = await findNewsById(Number(newsId));
  reply.send(news);
}

export async function getAllNews(req: FastifyRequest, reply: FastifyReply) {
  const news = await findAllNews();
  if (!news) {
    return reply.status(204).send({
      message: "Nenhum conteúdo encontrado",
    });
  }
  reply.send(news);
}

export async function getNewsByUserId(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const { userId } = req.params;
  const news = await findNewsByUserId(Number(userId));
  if (!news)
    return reply.status(204).send({
      message: "Nenhum conteúdo encontrado",
    });

  reply.send(news);
}

export async function createNews(
  req: FastifyRequest<{ Body: CreateNewsInput }>,
  reply: FastifyReply
) {
  const newsData = req.body;
  const news = await insertNews(newsData);
  reply.send({ id: news?.id, message: "News created successfully" });
}

export async function putNews(
  req: FastifyRequest<{ Params: { newsId: string }; Body: UpdateNewsInput }>,
  reply: FastifyReply
) {
  const { newsId } = req.params;
  const newsData = req.body;
  const updatedNews = await updateNews(Number(newsId), newsData);
  reply.send(updatedNews);
}

export async function removeNews(
  req: FastifyRequest<{ Params: { newsId: string } }>,
  reply: FastifyReply
) {
  const { newsId } = req.params;
  const deletedNews = await deleteNews(Number(newsId));
  if (!deletedNews) {
    return reply.status(404).send({ message: "Erro ao deletar conteúdo!" });
  }
  reply.send({ message : "News deleted successfully" });
}

export async function callAi(
  req: FastifyRequest<{ Body: AiVerificationTextInput }>,
  reply: FastifyReply
) {
  const { argument } = req.body;
  const result = await validateAI({ argument });
  reply.send(result);
}
