import userRoutes from "./src/routes/user.routes";

const app = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const { Server } = require("socket.io");

app.register(cors, {
  origin: "*",
  methods: ["*"],
});

app.register(userRoutes, { prefix: "/api/v1/user" });

const server = app.server;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");

  socket.on("message", (data: any) => {
    io.emit("message", `Server received: ${data}`);
  });

  socket.on("approved", (data: any) => {
    io.emit("approved", `${data} Aprovou!`);
  });

  socket.on("refused", (data: any) => {
    io.emit("refused", `${data} Reprovou!`);
  });

  socket.on("noVote", (data: any) => {
    io.emit("noVote", `${data} Não votou!`);
  });

  socket.on("showModal", () => {
    io.emit("showModal");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
app.listen({ port: 3000 }, (err?: Error, address?: string) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
