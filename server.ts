"use strict";
import { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./src/module/user/user.routes";
import { userSchemas } from "./src/module/user/user.schema";
import fCookie from "@fastify/cookie";
import fjwt, { FastifyJWT } from "@fastify/jwt";

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

fastify.register(userRoutes, { prefix: "/api/v1/user" });

// const { Server } = require("socket.io");
// const server = fastify.server;

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["*"],
//   },
// });

// io.on("connection", (socket: any) => {
//   console.log("a user connected");

//   socket.on("message", (data: any) => {
//     io.emit("message", `Server received: ${data}`);
//   });

//   socket.on("approved", (data: any) => {
//     io.emit("approved", `${data} Aprovou!`);
//   });

//   socket.on("refused", (data: any) => {
//     io.emit("refused", `${data} Reprovou!`);
//   });

//   socket.on("noVote", (data: any) => {
//     io.emit("noVote", `${data} Não votou!`);
//   });

//   socket.on("showModal", () => {
//     io.emit("showModal");
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

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
