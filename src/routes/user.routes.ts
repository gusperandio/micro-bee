import { FastifyInstance } from "fastify";
import { insertUser } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  //  fastify.get("", getAllControls);

  fastify.post("", insertUser);
}
