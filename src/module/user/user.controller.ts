import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateOrLoginSocialUserInput,
  CreateUserInput,
  DeleteUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "./user.schema";
import prisma from "../../util/prisma";
import {
  userExist,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateLastLogin,
  updateUser,
} from "./userService";
import PasswordManager from "../../util/passwordManager";
import { payload } from "../../util/payload";

export async function createUserController(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { password, email, name, age, role } = req.body;
  if (await userExist(email)) {
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
    updateLastLogin(newUser.id);
    const token = req.server.jwt.sign(payload(newUser.name));

    return reply.code(201).send({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      access_token: token,
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

  let user = await getUserByEmail(email);

  try {
    if (!user)
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

    updateLastLogin(user.id);
    const token = req.server.jwt.sign(payload(user.name));

    return reply.code(201).send({
      id: user.id,
      email: user.email,
      name: user.name,
      access_token: token,
      expire_in: 1000,
      token_type: "Bearer",
    });
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function loginController(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (user && user.socialAuth) {
    return reply.code(401).send({
      message: "Tente o login social com Google!",
    });
  }

  const isMatch =
    user &&
    (await PasswordManager.getInstance().checkPassword(
      password,
      user.password!
    ));

  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Email ou senha invalidos!",
    });
  }

  updateLastLogin(user.id);
  const token = req.server.jwt.sign(payload(user.name));

  return reply.code(201).send({
    id: user.id,
    email: user.email,
    name: user.name,
    access_token: token,
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
  let { id, password, name, age, role, premiumTime } = req.body;
  const userExist = await getUserById(id);

  if (userExist?.socialAuth && password)
    return reply.code(400).send({
      message: "Login social não precisa alterar a senha!",
    });

  if (password)
    password = await PasswordManager.getInstance().hashPassword(password);

  const updated = updateUser(userExist!.id, {
    password,
    name,
    age,
    role,
    premiumTime,
  });

  if (!updated)
    return reply.code(400).send({
      message: "Erro ao atualizar!",
    });

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
  const userExist = await getUserById(id);

  const deleted = deleteUser(userExist!.id);

  if (!deleted) {
    return reply.code(400).send({
      message: "Erro ao deletar!",
    });
  }

  return reply.code(200).send({ message: "Usuário deletado!" });
}
