import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  createUserController,
  deleteUserController,
  loginController,
  loginSocialController,
  logoutController,
  updateUserController,
} from "./user.controller";
import { $ref } from "./user.schema";
import { authMiddleware } from "../../config/authenticate";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    createUserController
  );

  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginController
  );

  app.post(
    "/loginSocial",
    {
      schema: {
        body: $ref("createOrLoginSocialUserSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginSocialController
  );

  app.put(
    "/update",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("updateResponseUserSchema"),
        },
      },
    },
    updateUserController
  );

  app.delete(
    "/delete",
    {
      preHandler: [authMiddleware],
      schema: {
        body: $ref("deleteUserSchema"),
        response: {
          200: $ref("deleteResponseUserSchema"),
        },
      },
    },
    deleteUserController
  );

  app.delete("/logout", { preHandler: [authMiddleware] }, logoutController);

  app.log.info("user routes registered");
}
