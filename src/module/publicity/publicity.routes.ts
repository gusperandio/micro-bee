import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../config/authenticate";
import { $ref } from "./publicity.schema";
import { createPub, createReportPublicities, getAllPubs, getPubById, getPubsByUserId, putPub, removePub } from "./publicity.controller";

 
export async function publicitiesRoutes(app: FastifyInstance) {
  app.get(
    "/:pubId",
    {
      preHandler: [authMiddleware],
      schema: {
        type: "object",
        properties: {
          newsId: { type: "string" },
        },
        response: {
          200: $ref("searchPubSchema"),
        },
      },
    },
    getPubById
  );

  app.get(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        response: {
          200: $ref("pubsArraySchemaResponse"),
        },
      },
    },
    getAllPubs
  );

  app.get(
    "/pub/:userId",
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
          200: $ref("pubsArraySchemaResponse"),
        },
      },
    },
    getPubsByUserId
  );

  app.post(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("createPubSchema"),
        response: {
          200: $ref("createPubResponse"),
        },
      },
    },
    createPub
  );

  app.put(
    "/:pubId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: {
          type: "object",
          properties: {
            newsId: { type: "string" },
          },
        },
        body: $ref("updatePubSchema"),
        response: {
          200: $ref("updateResponsePubSchema"),
        },
      },
    },
    putPub
  );

  app.delete(
    "/:pubId",
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
          200: $ref("deleteResponsePubSchema"),
        },
      },
    },
    removePub
  );

  app.post(
    "/report",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("reportPubSchema"),
        response: {
          200: $ref("reportPubSchemaResponse"),
        },
      },
    },
    createReportPublicities
  );

  app.log.info("publicity routes registered");
}
