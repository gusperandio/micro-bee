import { FastifyRequest, FastifyReply, RouteGenericInterface } from "fastify";

export async function authMiddleware<T extends RouteGenericInterface>(
  req: FastifyRequest<T>,
  reply: FastifyReply
) {
  await req.jwtVerify();
}
