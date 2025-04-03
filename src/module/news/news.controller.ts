import { FastifyReply, FastifyRequest } from "fastify";
import {
  SearchNewsInput,
  CreateNewsInput,
  UpdateNewsInput,
  AiVerificationTextInput,
  ReportInput,
} from "./news.schema";
import {
  findNewsById,
  findAllNews,
  insertNews,
  updateNews,
  deleteNews,
  findNewsByUserId,
  validateAI,
  createReport,
} from "./news.repository";

export async function getNewsById(
  req: FastifyRequest<{ Params: SearchNewsInput }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = req.params;
    const news = await findNewsById(Number(newsId));

    if (!news) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Notícia não encontrada",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Notícia encontrada",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar notícia",
    });
  }
}
 
export async function getAllNews(req: FastifyRequest, reply: FastifyReply) {
  try {
    const news = await findAllNews();

    if (!news.length) {
      return reply.code(204).send({
        statusCode: 204,
        message: "Nenhuma notícia encontrada",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Notícias encontradas",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar notícias",
    });
  }
}
 
export async function getNewsByUserId(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  try {
    const { userId } = req.params;
    const news = await findNewsByUserId(Number(userId));

    if (!news.length) {
      return reply.code(204).send({
        statusCode: 204,
        message: "Nenhuma notícia encontrada para este usuário",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Notícias encontradas",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar notícias do usuário:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar notícias do usuário",
    });
  }
}


export async function createNews(
  req: FastifyRequest<{ Body: CreateNewsInput }>,
  reply: FastifyReply
) {
  try {
    const newsData = req.body;
    const news = await insertNews(newsData);

    if (!news) {
      throw new Error("Erro ao criar notícia");
    }

    return reply.code(201).send({
      statusCode: 201,
      message: "Notícia criada com sucesso",
      data: { id: news.id },
    });
  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao criar notícia",
    });
  }
}

export async function putNews(
  req: FastifyRequest<{ Params: { newsId: string }; Body: UpdateNewsInput }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = req.params;
    const newsData = req.body;
    const updatedNews = await updateNews(Number(newsId), newsData);

    if (!updatedNews) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Notícia não encontrada para atualização",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Notícia atualizada com sucesso",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao atualizar notícia",
    });
  }
}

export async function removeNews(
  req: FastifyRequest<{ Params: { newsId: string } }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = req.params;
    const deletedNews = await deleteNews(Number(newsId));

    if (!deletedNews) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Notícia não encontrada para remoção",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Notícia removida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao remover notícia:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao remover notícia",
    });
  }
}


export async function callAi(
  req: FastifyRequest<{ Body: AiVerificationTextInput }>,
  reply: FastifyReply
) {
  try {
    const { argument } = req.body;
    const result = await validateAI({ argument });

    return reply.code(200).send({
      statusCode: 200,
      message: "Validação concluída",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao validar com IA:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao validar com IA",
    });
  }
}

export async function createReportNews(
  req: FastifyRequest<{ Body: ReportInput }>,
  reply: FastifyReply
) {
  try {
    const { idUserReporter, idNews, reason } = req.body;

    await createReport(idUserReporter, idNews, reason);

    return reply.code(200).send({
      message: "Agradecemos o seu feedback!",
    });
  } catch (error) {
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao reportar notícia",
    });
  }
}
