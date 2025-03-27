import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../config/authenticate";
import { $ref } from "./payments.schema";
import {
  createPayment, 
  getAllPayment,
  getPaymentById,
  getPaymentByUserId,
  getStatusPayment, 
} from "./payments.controller";

export async function paymentRoutes(app: FastifyInstance) {
  app.get(
    "/:paymentId",
    {
      preHandler: [authMiddleware],
      schema: {
        type: "object",
        properties: {
          paymentId: { type: "string" },
        },
        response: {
          200: $ref("searchResponsePaymentSchema"),
        },
      },
    },
    getPaymentById
  );

  app.get(
    "status/:paymentId",
    {
      preHandler: [authMiddleware],
      schema: {
        type: "object",
        properties: {
          paymentId: { type: "string" },
        },
        response: {
          200: $ref("verifyResponsePaymentSchema"),
        },
      },
    },
    getStatusPayment
  );

  app.get(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        response: {
          200: $ref("paymentArraySchemaResponse"),
        },
      },
    },
    getAllPayment
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
          200: $ref("paymentArraySchemaResponse"),
        },
      },
    },
    getPaymentByUserId
  );

  app.post(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("createPaymentSchema"),
        response: {
          200: $ref("createPaymentResponse"),
        },
      },
    },
    createPayment
  );


  app.log.info("payment routes registered");
}
