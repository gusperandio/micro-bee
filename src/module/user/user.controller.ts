import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput, LoginUserInput } from "./user.schema";
import prisma from "../../util/prisma";
import bcrypt from "bcrypt";
import { checkUser } from "../../services/userService";
import passManager from "../../util/passManager";

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { password, email, name, age, role } = req.body;

  if (await checkUser(email)) {
    return reply.code(401).send({
      message: "E-mail em uso!",
    });
  }

  try {
    const hash = await passManager
      .getInstance()
      .hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        password: hash,
        email: email,
        age: age,
        socialAuth: false,
        premiumTime: null,
        lastLogin: new Date(),
        roles: {
          create: [
            {
              role: { connect: { name: role ?? "USER" } },
            },
          ],
        },
      },
    });

    return reply.code(201).send(newUser);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function login(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });
  const isMatch = user && (await bcrypt.compare(password, user.password));

  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  const token = req.jwt.sign(payload);

  return { accessToken: token };
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout successful" });
}
