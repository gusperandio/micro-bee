import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { DemandDataType } from "../types/DemandData";
import { ControlDataType } from "../types/ControlData";
import { createControl, selectAllControls } from "../services/demandService";
const prisma = new PrismaClient();
export async function getAllControls(req: FastifyRequest, reply: FastifyReply) {
  const controlList = await selectAllControls();

  if (!controlList) {
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "Invalid input" });
  }

  return reply.send({ controlList });
}

export async function insertControl(req: FastifyRequest, reply: FastifyReply) {
  const insert = await createControl((await req.body) as ControlDataType);

  if (!insert)
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "Error to create your Control" });

  return reply
    .status(200)
    .send({ message: "Control registered successfully!" });
}

export async function addDemand(req: FastifyRequest, reply: FastifyReply) {
  const insert = await createControl((await req.body) as ControlDataType);

  if (!insert)
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "Error to create your Control" });

  return reply
    .status(200)
    .send({ message: "Control registered successfully!" });
}
