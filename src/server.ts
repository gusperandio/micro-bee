import { userRoutes } from "./module/user/user.routes";
import { userSchemas } from "./module/user/user.schema";
import fCookie from "@fastify/cookie";
import { newsRoutes } from "./module/news/news.routes";
import { newsSchemas } from "./module/news/news.schema";
import { PaymentSchemas } from "./module/payments/payments.schema";
import { paymentRoutes } from "./module/payments/payments.routes";

const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

fastify.register(cors, {
  origin: "*",
  methods: ["*"],
});

fastify.register(require("@fastify/jwt"), { secret: process.env.SECRET_KEY });

fastify.register(fCookie, {
  secret: process.env.COOKIE_KEY,
  hook: "preHandler",
});

[userSchemas, newsSchemas, PaymentSchemas].flat().forEach((schema) => fastify.addSchema(schema));

fastify.register(userRoutes, { prefix: "/api/v1/user" });
fastify.register(newsRoutes, { prefix: "/api/v1/news" });
fastify.register(paymentRoutes, { prefix: "/api/v1/payment" });

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
