import { FastifyReply, FastifyRequest } from "fastify";
 
import {
  createReportPub,
  deletePublicity,
  findAllPublicites,
  findPublicityById,
  findPublicityByUserId,
  insertPublicity, 
  updatePublicity,
} from "./publicity.repository";
import { CreatePubInput, ReportInput, SearchPubInput, UpdatePubInput } from "./publicity.schema";

export async function getPubById(
  req: FastifyRequest<{ Params: SearchPubInput }>,
  reply: FastifyReply
) {
  try {
    const { pubId } = req.params;
    const news = await findPublicityById(Number(pubId));

    if (!news) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Publicidade não encontrada",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Publicidade encontrada",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar Publicidade:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar Publicidade",
    });
  }
}

export async function getAllPubs(req: FastifyRequest, reply: FastifyReply) {
  try {
    const news = await findAllPublicites();

    if (!news.length) {
      return reply.code(204).send({
        statusCode: 204,
        message: "Nenhuma Publicidade encontrada",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Publicidades encontradas",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar Publicidades:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar Publicidades",
    });
  }
}

export async function getPubsByUserId(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  try {
    const { userId } = req.params;
    const news = await findPublicityByUserId(Number(userId));

    if (!news.length) {
      return reply.code(204).send({
        statusCode: 204,
        message: "Nenhuma Publicidade encontrada para este usuário",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Publicidades encontradas",
      data: news,
    });
  } catch (error) {
    console.error("Erro ao buscar Publicidades do usuário:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar Publicidades do usuário",
    });
  }
}

export async function createPub(
  req: FastifyRequest<{ Body: CreatePubInput }>,
  reply: FastifyReply
) {
  try {
    const newsData = req.body;
    const news = await insertPublicity(newsData);

    if (!news) {
      throw new Error("Erro ao criar Publicidade");
    }

    return reply.code(201).send({
      statusCode: 201,
      message: "Publicidade criada com sucesso",
      data: { id: news.id },
    });
  } catch (error) {
    console.error("Erro ao criar Publicidade:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao criar Publicidade",
    });
  }
}

export async function putPub(
  req: FastifyRequest<{ Params: { newsId: string }; Body: UpdatePubInput }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = req.params;
    const newsData = req.body;
    const updatedNews = await updatePublicity(Number(newsId), newsData);

    if (!updatedNews) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Publicidade não encontrada para atualização",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Publicidade atualizada com sucesso",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Erro ao atualizar Publicidade:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao atualizar Publicidade",
    });
  }
}

export async function removePub(
  req: FastifyRequest<{ Params: { newsId: string } }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = req.params;
    const deletedNews = await deletePublicity(Number(newsId));

    if (!deletedNews) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Publicidade não encontrada para remoção",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Publicidade removida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao remover Publicidade:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao remover Publicidade",
    });
  }
}
 

export async function createReportPublicities(
  req: FastifyRequest<{ Body: ReportInput }>,
  reply: FastifyReply
) {
  try {
    const { idUserReporter, idPub, reason } = req.body;

    await createReportPub(idUserReporter, idPub, reason);

    return reply.code(200).send({
      message: "Agradecemos o seu feedback!",
    });
  } catch (error) {
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao reportar Publicidade",
    });
  }
}

