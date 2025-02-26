import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateOrLoginSocialUserInput,
  CreateUserInput,
  DeleteUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "./user.schema";
import prisma from "../../util/prisma";
import bcrypt from "bcrypt";
import {
  checkUser,
  deleteUser,
  updateLastLogin,
  updateUser,
} from "./userService";
import PasswordManager from "../../util/passwordManager";
import e from "cors";
import { payload } from "../../util/payload";

export async function createUserController(
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
    const hash = await PasswordManager.getInstance().hashPassword(password);

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

    const token = req.server.jwt.sign(payload(newUser.name));
    reply.setCookie("access_token", token, {
      path: "/login",
      httpOnly: true,
      secure: true,
    });

    return reply.code(201).send({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token,
      expire_in: 1000,
      token_type: "Bearer",
    });
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function loginSocialController(
  req: FastifyRequest<{
    Body: CreateOrLoginSocialUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, name } = req.body;

  let user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          name: name,
          password: null,
          email: email,
          age: 0,
          socialAuth: true,
          premiumTime: null,
          lastLogin: new Date(),
          roles: {
            create: [
              {
                role: { connect: { name: "USER" } },
              },
            ],
          },
        },
      });
    } catch (e) {
      return reply.code(500).send(e);
    }
  }

  const token = req.server.jwt.sign(payload(user.name));
  reply.setCookie("access_token", token, {
    path: "/login",
    httpOnly: true,
    secure: true,
  });

  return reply.code(201).send({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
    expire_in: 1000,
    token_type: "Bearer",
  });
}

export async function loginController(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  const isMatch =
    user &&
    (await PasswordManager.getInstance().checkPassword(
      password,
      user.password!
    ));

  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  updateLastLogin(user.id);

  const token = req.server.jwt.sign(payload(user.name));
  reply.setCookie("access_token", token, {
    path: "/login",
    httpOnly: true,
    secure: true,
  });

  return reply.code(201).send({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
    expire_in: 1000,
    token_type: "Bearer",
  });
}

export async function updateUserController(
  req: FastifyRequest<{
    Body: UpdateUserInput;
  }>,
  reply: FastifyReply
) {
  const { id, email, password, name, age, role, premiumTime } = req.body;
  const userExist = await prisma.user.findUnique({ where: { id } });

  const updated = updateUser(userExist!.id, {
    email,
    password,
    name,
    age,
    role,
    premiumTime,
  });

  if (!updated) {
    return reply.code(400).send({
      message: "Erro ao atualizar!",
    });
  }

  const updateMessages = Object.entries(req.body)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, _]) => `${key} foi atualizado`);

  return reply.code(201).send({
    updateMessages,
  });
}

export async function deleteUserController(
  req: FastifyRequest<{
    Body: DeleteUserInput;
  }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  const userExist = await prisma.user.findUnique({ where: { id } });

  const deleted = deleteUser(userExist!.id);

  if (!deleted) {
    return reply.code(400).send({
      message: "Erro ao deletar!",
    });
  }

  const updateMessages = Object.entries(req.body)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, _]) => `${key} foi atualizado`);

  return reply.code(201).send({
    updateMessages,
  });
}

export async function logoutController(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout successful" });
}
