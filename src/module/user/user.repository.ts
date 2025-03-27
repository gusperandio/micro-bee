import { PrismaClient, User as UserPrisma } from "@prisma/client";
import passManager from "../../util/passwordManager";
import prisma from "../../util/prisma";

export const userExist = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) return true;
  return false;
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

export const getUserByEmail = async (
  email: string
): Promise<UserPrisma | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const createUser = async (
  data: Partial<UserPrisma>
): Promise<UserPrisma | null> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name!,
        password: data.password,
        email: data.email!,
        age: data.age!,
        socialAuth: data.socialAuth!,
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

    if (!newUser) {
      throw new Error("Erro ao criar usuário");
    }
    return newUser;
  } catch (error) {
    console.error("Erro", error);
    return null;
  }
};

export const updateUser = async (
  id: number,
  data: Partial<any>
): Promise<boolean> => {
  try {
    if (data.role !== undefined) {
      data.roles = {
        create: [
          {
            role: { connect: { name: data.role } },
          },
        ],
      };
    }

    const updated = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
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
    const deleteUser = await prisma.user.delete({
      where: { id: id },
    });

    if (!deleteUser) {
      throw new Error("User deleted failed!");
    }
    return true;
  } catch (error) {
    console.error("Error delete user:", error);
    return false;
  }
};

export const updateLastLogin = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
    return true;
  } catch (error) {
    console.error("Error updating last login:", error);
    return false;
  }
};
