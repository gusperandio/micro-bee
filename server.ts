import { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./src/module/user/user.routes";
import { userSchemas } from "./src/module/user/user.schema";
import fCookie from "@fastify/cookie";
import fjwt, { FastifyJWT } from "@fastify/jwt";

const app = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

app.register(cors, {
  origin: "*",
  methods: ["*"],
});
app.register(require("@fastify/jwt"), { secret: process.env.SECRET_KEY });

// app.addHook("preHandler", async (req: FastifyRequest, reply: FastifyReply) => {
//   try {
//     console.log("preHandler");
//     await req.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });

app.register(fCookie, {
  secret: process.env.COOKIE_KEY,
  hook: "preHandler",
});

 
app.decorate(
  "authenticate",
  async function (req: FastifyRequest, reply: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  }
);

for (let schema of userSchemas) {
  app.addSchema(schema);
}

app.register(userRoutes, { prefix: "/api/v1/user" });

// const { Server } = require("socket.io");
// const server = app.server;

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
    await app.close();
    process.exit(0);
  });
});

async function main() {
  app.listen({ port: 3000 }, (err?: Error, address?: string) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  });
}
main();
