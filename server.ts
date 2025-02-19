import demandRoutes from "./src/routes/demand.routes";

const app = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { Server } = require('socket.io');

// Configure CORS
app.register(cors, { 
  origin: '*',
  methods: ['*']
});

app.register(demandRoutes, { prefix: '/api/v1/demands' });

// Create HTTP server through Fastify
const server = app.server;

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['*'],
  },
});
 
io.on('connection', (socket: any) => {
  console.log('a user connected');

  socket.on('message', (data: any) => { 
    io.emit('message', `Server received: ${data}`);
  });

  socket.on('approved', (data: any) => {
    io.emit('approved', `${data} Aprovou!`);
  });

  socket.on('refused', (data: any) => { 
    io.emit('refused', `${data} Reprovou!`);
  });

  socket.on('noVote', (data: any) => { 
    io.emit('noVote', `${data} Não votou!`);
  });

  socket.on('showModal', () => { 
    io.emit('showModal');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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