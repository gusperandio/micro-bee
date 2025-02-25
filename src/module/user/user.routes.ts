import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.controller";
import { $ref } from "./user.schema";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "/ route hit" });
  });

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
    createUser
  );

  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    () =>{}
  );

  app.delete("/logout", { preHandler: [app.authenticate] }, () => {});
  app.log.info("user routes registered");
}