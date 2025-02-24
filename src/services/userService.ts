import { PrismaClient, User as UserPrisma } from "@prisma/client";
import { UserLoginType, UserSocialLoginType, UserType } from "../types/User";
import passManager from "../util/passManager";
import { RespCustomType } from "../types/RespCustom";

const prisma = new PrismaClient();

export const createUser = async (data: UserType): Promise<RespCustomType> => {
  try {
    if (await checkUser(data.email)) {
      return { status: 400, message: "E-mail em uso!" } as RespCustomType;
    }

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
        age: data.age,
        socialAuth: false,
        premiumTime: data.premiumTime ?? null,
        lastLogin: new Date(),
        roles: {
          create: [
            {
              role: { connect: { name: data.role ?? "USER" } },
            },
          ],
        },
      },
    });

    if (!newUser) {
      throw new Error("Erro ao cadastrar usuário! Tente mais tarde.");
    }

    return { status: 200, message: "Usuário criado!" } as RespCustomType;
  } catch (error) {
    return { status: 200, message: error } as RespCustomType;
  }
};

export const loginUser = async (
  data: UserLoginType
): Promise<RespCustomType> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { roles: true },
    });

    if (!user) {
      return {
        status: 400,
        message: "Usuário ou senha incorretos!",
      } as RespCustomType;
    }

    if (user.socialAuth) {
      return {
        status: 400,
        message: "Tente logar com a conta Goole!",
      } as RespCustomType;
    }

    const isPasswordCorrect = await passManager
      .getInstance()
      .checkPassword(data.password, user.password!);

    if (!isPasswordCorrect) {
      return {
        status: 400,
        message: "Usuário ou senha incorretos!",
      } as RespCustomType;
    }

    if (!(await updateLastLogin(user.email))) {
      return {
        status: 500,
        message: "Erro ao logar usuário! Tente mais tarde.",
      } as RespCustomType;
    }

    return { status: 200, message: "Usuário logado!" } as RespCustomType;
  } catch (error) {
    return {
      status: 500,
      message: error,
    } as RespCustomType;
  }
};

export const loginSocial = async (user: UserSocialLoginType) => {
  try {
    const userExist = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userExist && (await updateLastLogin(userExist.email))) {
      return { status: 200, message: "Usuário logado!" } as RespCustomType;
    }

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        socialAuth: true,
        age: 0,
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

    if (!newUser) {
      throw new Error("Erro ao cadastrar usuário! Tente mais tarde.");
    }

    return { status: 202, message: "Verificar idade!" } as RespCustomType;
  } catch (error) {
    return { status: 500, message: error } as RespCustomType;
  }
};

export const getUserById = async (id: number): Promise<UserPrisma | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const updateUser = async (
  id: number,
  data: Partial<UserType>
): Promise<boolean> => {
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
        age: data.age,
        socialAuth: data.socialAuth,
        premiumTime: data.premiumTime,
        lastLogin: data.lastLogin,
        creditCard: data.creditCard
          ? { connect: { id: data.creditCard.id } }
          : undefined,
      },
    });
    if (!updated) {
      throw new Error("User update failed!");
    }
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const deleted = prisma.user.delete({ where: { id } });
    if (!deleted) {
      throw new Error("User deleted failed!");
    }
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const checkUser = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) return true;
  return false;
};

export const updateLastLogin = async (email: string): Promise<boolean> => {
  try {
    await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });
    return true;
  } catch (error) {
    console.error("Error updating last login:", error);
    return false;
  }
};
