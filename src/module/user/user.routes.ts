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

const middleware = (_req: any, _res: any, next: any) => {
  // const token = app.jwt.sign({ id: 12 });
  console.log("token middleware");
  next();
};

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
      // preHandler: [middleware],
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
      // preHandler: [middleware],
      schema: {
        body: $ref("deleteUserSchema"),
        response: {
          200: $ref("deleteResponseUserSchema"),
        },
      },
    },
    deleteUserController
  );

  app.delete("/logout", { preHandler: [middleware] }, logoutController);
  app.get(
    "/try",
    {
      preHandler: [app.authenticate],
      // preHandler: [app.authenticate],
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    (_req: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).send({ message: "controller here" });
    }
  );
  app.log.info("user routes registered");
}
