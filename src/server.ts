import { userRoutes } from "./module/user/user.routes";
import { userSchemas } from "./module/user/user.schema";
import fCookie from "@fastify/cookie";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import { newsRoutes } from "./module/news/news.routes";
import { newsSchemas } from "./module/news/news.schema";

const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

fastify.register(cors, {
  origin: "*",
  methods: ["*"],
});

fastify.register(require("@fastify/jwt"), { secret: process.env.SECRET_KEY });

// fastify.addHook(
//   "preHandler",
//   async (req: FastifyRequest, reply: FastifyReply) => {
//     try {
//       console.log(req.originalUrl);
//       await req.jwtVerify();
//     } catch (err) {
//       reply.send(err);
//     }
//   }
// );

fastify.register(fCookie, {
  secret: process.env.COOKIE_KEY,
  hook: "preHandler",
});

//  fastify.decorate(
//    "authenticate",
//    async function (req: FastifyRequest, reply: FastifyReply) {
//      try {
//        await req.jwtVerify();
//      } catch (err) {
//        reply.status(401).send({ message: "Unauthorized" });
//      }
//    }
//  );

for (let schema of userSchemas) {
  fastify.addSchema(schema);
}

for (let newsSchema of newsSchemas) {
  fastify.addSchema(newsSchema);
}

fastify.register(userRoutes, { prefix: "/api/v1/user" });
fastify.register(newsRoutes, { prefix: "/api/v1/news" });

// Start the server
const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

async function main() {
  fastify.listen({ port: 3000 }, (err?: Error, address?: string) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
  });
}
main();
