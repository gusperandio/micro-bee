import { Publicity as PublicityPrisma } from "@prisma/client";
import prisma from "../../util/prisma";
import { CreatePubInput, UpdatePubInput } from "./publicity.schema";


export async function findPublicityById(
  id: number
): Promise<PublicityPrisma | null> {
  try {
    return await prisma.publicity.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao buscar publicidade por ID:", error);
    throw new Error("Erro ao buscar publicidade");
  }
}

export async function findAllPublicites(
  days: number = 3
): Promise<PublicityPrisma[]> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.publicity.findMany({
      where: { createdAt: { gte: startDate } },
    });
  } catch (error) {
    console.error("Erro ao buscar publicidades:", error);
    throw new Error("Erro ao buscar publicidades");
  }
}

export async function findPublicityByUserId(
  userId: number
): Promise<PublicityPrisma[]> {
  try {
    return await prisma.publicity.findMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Erro ao buscar publicidades do usuário:", error);
    throw new Error("Erro ao buscar publicidades do usuário");
  }
}

export async function insertPublicity(
  data: CreatePubInput
): Promise<PublicityPrisma> {
  try {
    const newPost = await prisma.publicity.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        photo: data.photo,
        cape: data.cape,
        user: { connect: { id: data.userId } },
      },
    });

    return newPost;
  } catch (error) {
    console.error("Erro ao inserir publicidade:", error);
    throw new Error("Erro ao publicar seu conteúdo");
  }
}

export async function updatePublicity(
  id: number,
  data: UpdatePubInput
): Promise<PublicityPrisma> {
  try {
    const updateData: Partial<PublicityPrisma> = {
      title: data.title,
      description: data.description,
      url: data.url,
      photo: data.photo,
      cape: data.cape,
    };

    return await prisma.publicity.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    console.error("Erro ao atualizar publicidade:", error);
    throw new Error("Erro ao atualizar publicidade");
  }
}

export async function deletePublicity(
  id: number
): Promise<PublicityPrisma | null> {
  try {
    return await prisma.publicity.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar publicidade:", error);
    throw new Error("Erro ao deletar publicidade");
  }
}

export async function createReportPub(
  idPub: number,
  idUser: number,
  reason: string
) {
  try {
    await prisma.reportsPublicity.create({
      data: {
        idUserReporter: idUser,
        publicityId: idPub,
        reason: reason,
      },
    });
  } catch (error) {
    console.error("Erro ao criar report:", error);
    throw new Error("Erro ao criar report");
  }
}
