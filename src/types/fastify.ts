import { JWT } from "@fastify/jwt";
import "@fastify/jwt";
import { FastifyInstance, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    jwt: JWT; 
  }
}
declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
type UserPayload = {
  uuid: string;
  name: string;
  exp: number;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
