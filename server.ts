import { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./src/module/user/user.routes";
import { userSchemas } from "./src/module/user/user.schema";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";

const app = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
// const { Server } = require("socket.io");

app.register(cors, {
  origin: "*",
  methods: ["*"],
});

app.register(fjwt, { secret: process.env.SECRET_KEY });
app.addHook("preHandler", (req: FastifyRequest, res: FastifyReply) => {
  if (!req.jwt) {
    req.jwt = app.jwt;
  }
  return app.next();
});
app.register(fCookie, {
  secret: process.env.COOKIE_KEY,
  hook: "preHandler",
});

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;
    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    }
    // here decoded will be a different type by default but we want it to be of user-payload type
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);

for (let schema of userSchemas) {
  app.addSchema(schema);
}

app.register(userRoutes, { prefix: "/api/v1/user" });

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
app.listen({ port: 3000 }, (err?: Error, address?: string) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
