import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../config/authenticate";
import { $ref } from "../news/news.schema";
import { createNews, removeNews, getAllNews, getNewsById, getNewsByUserId, putNews, callAi } from "./news.controller";

export async function newsRoutes(app: FastifyInstance) {
  app.get(
    "/news/:id",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          id: { type: "string" },
        },
        response: {
          200: $ref("searchResponseNewsSchema"),
        },
      },
    },
    getNewsById
  );

  app.get(
    "/news",
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

  app.get(
    "/news/user/:userId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          userId: { type: "string" },
        },
        response: {
          200: $ref("newsArraySchemaResponse"),
        },
      },
    },
    getNewsByUserId
  );

  app.post(
    "/news",
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
    "/news/:id",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          id: { type: "string" },
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
    "/news/:id",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          id: { type: "string" },
        },
        response: {
          200: $ref("deleteResponseNewsSchema"),
        },
      },
    },
    removeNews
  );
}
