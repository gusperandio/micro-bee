import { PrismaClient, User as UserPrisma } from "@prisma/client";
import { UserLoginType, UserSocialLoginType, UserType } from "../../types/User";
import passManager from "../../util/passwordManager";
import { RespCustomType } from "../../types/RespCustom";

const prisma = new PrismaClient();

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
        premiumTime: data.premiumTime,
        roles: {
          create: [
            {
              role: { connect: { name: data.role } },
            },
          ],
        },
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
    console.error("Error delete user:", error);
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
