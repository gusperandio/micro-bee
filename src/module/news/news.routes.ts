import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../config/authenticate";
import { $ref } from "../user/user.schema";

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
          200: $ref("deleteResponseUserSchema"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      // Logic to get news by id
      reply.send({ id });
    }
  );

  app.get("/news", async (request, reply) => {
    // Logic to get all news of the last 7 days
    reply.send([]);
  });

  app.get("/validateAI", async (request, reply) => {
    // Logic to verify if text is correct using AI
    reply.send([]);
  });

  app.get("/news/user/:userId", async (request, reply) => {
    const { userId } = request.params;
    // Logic to get news by user ID
    reply.send({ userId });
  });

  app.post("/news", async (request, reply) => {
    const newsData = request.body;
    // Logic to post news
    reply.send(newsData);
  });

  app.put("/news/:id", async (request, reply) => {
    const { id } = request.params;
    const newsData = request.body;
    // Logic to update news
    reply.send({ id, ...newsData });
  });

  app.delete("/news/:id", async (request, reply) => {
    const { id } = request.params;
    // Logic to delete news
    reply.send({ id });
  });
}
