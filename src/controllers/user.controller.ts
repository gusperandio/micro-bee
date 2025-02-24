import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../services/userService";
import { UserType } from "../types/User"; 
//  export async function getAllControls(req: FastifyRequest, reply: FastifyReply) {
//    const controlList = await selectAllControls();

//    if (!controlList) {
//      return reply
//        .status(400)
//        .send({ error: "Bad Request", message: "Invalid input" });
//    }

//    return reply.send({ controlList });
//  }

export async function insertUser(req: FastifyRequest, reply: FastifyReply) {
  const insert = await createUser((await req.body) as UserType);
  if (!insert)
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "Error to create new User" });

  return reply
    .status(200)
    .send({ message: "Control registered successfully!" });
}
