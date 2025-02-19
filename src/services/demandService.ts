import { Prisma, PrismaClient } from "@prisma/client";
import { ControlDataType } from "../types/ControlData";
import { EndOfYear, StartOfYear } from "../util/tools";

const prisma = new PrismaClient();
export async function selectAllControls() { 
  return await prisma.controlData.findMany({
    where: {
      finalDate: {
        gte: StartOfYear,
        lte: EndOfYear,
      },
    },
    include: {
      demandData: true,
    },
  });
}

export async function createControl(
  content: ControlDataType
): Promise<boolean | unknown> {
  try {
    await prisma.controlData.create({
      data: {
        initialDate: new Date(
          content.initialDate.split("/").reverse().join("-")
        ),
        finalDate: new Date(content.finalDate.split("/").reverse().join("-")),
        demandData: {
          create: content.demandData.map((demand) => ({
            project: demand.project,
            type: demand.type,
            who: demand.who,
            supp: demand.supp,
            demand: demand.demand,
            analist: demand.analist,
            aprov: demand.aprov,
            dev: demand.dev,
            test: demand.test,
            date: demand.date,
            usersApproved: demand.usersApproved || [],
            usersRefused: demand.usersRefused || [],
            usersIndifferent: demand.usersIndifferent || [],
          })),
        },
      },
      include: {
        demandData: content.demandData.length > 0, // Include the associated DemandData in the response
      },
    });

    return true;
  } catch (error) {
    return error;
  }
}
