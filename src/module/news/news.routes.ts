import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../config/authenticate";
import { $ref } from "../news/news.schema";
import {
  createNews,
  removeNews,
  getAllNews,
  getNewsById,
  getNewsByUserId,
  putNews,
  callAi,
} from "./news.controller";

export async function newsRoutes(app: FastifyInstance) {
  app.get(
    "/:newsId",
    {
      preHandler: [authMiddleware],
      schema: {
        type: "object",
        properties: {
          newsId: { type: "string" },
        },
        response: {
          200: $ref("newsArraySchemaResponse"),
        },
      },
    },
    getNewsById
  );

  app.get(
    "",
    {
      preHandler: [authMiddleware],
      schema: {
        response: {
          200: $ref("newsArraySchemaResponse"),
        },
      },
    },
    getAllNews
  );

  app.get(
    "/user/:userId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          type: "object",
          properties: {
            userId: { type: "string" },
          },
        },
        response: {
          200: $ref("newsArraySchemaResponse"),
        },
      },
    },
    getNewsByUserId
  );

  app.post(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("createNewsSchema"),
        response: {
          200: $ref("createNewsResponse"),
        },
      },
    },
    createNews
  );

  app.put(
    "/:newsId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          type: "object",
          properties: {
            newsId: { type: "string" },
          },
        },
        body: $ref("updateNewsSchema"),
        response: {
          200: $ref("searchResponseNewsSchema"),
        },
      },
    },
    putNews
  );

  app.delete(
    "/:newsId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          type: "object",
          properties: {
            newsId: { type: "string" },
          },
        },
        response: {
          200: $ref("deleteResponseNewsSchema"),
        },
      },
    },
    removeNews
  );

  app.post(
    "/validateAI",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("aiVerificationTextSchema"),
        response: {
          200: $ref("aiVerificationResponseSchema"),
        },
      },
    },
    callAi
  );

  app.log.info("news routes registered");
}
