import { FastifyInstance } from "fastify";
import { getAllControls, insertControl } from "../controllers/control.controller";

export default async function demandRoutes(fastify: FastifyInstance) {
  fastify.get("", getAllControls);

  fastify.post("", insertControl);
}