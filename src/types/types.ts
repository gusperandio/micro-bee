import { JWT } from "@fastify/jwt";
import "@fastify/jwt";
import { FastifyInstance, FastifyRequest } from "fastify";



declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
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