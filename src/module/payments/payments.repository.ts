import { Payment as PaymentPrisma } from "@prisma/client";
import prisma from "../../util/prisma";
import { CreatePaymentInput } from "./payments.schema";

export async function insertPayment(
  data: CreatePaymentInput
): Promise<PaymentPrisma> {
  try {
    return await prisma.payment.create({ data });
  } catch (error) {
    console.error("Erro ao inserir pagamento:", error);
    throw new Error("Não foi possível inserir o pagamento");
  }
}

export async function findAllPayments(): Promise<PaymentPrisma[]> {
  try {
    return await prisma.payment.findMany({
      include: { user: true },
    });
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    throw new Error("Erro ao buscar pagamentos");
  }
}

export async function findPaymentsById(
  id: number
): Promise<PaymentPrisma | null> {
  try {
    return await prisma.payment.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao buscar pagamento por ID:", error);
    throw new Error("Erro ao buscar pagamento");
  }
}

export async function findPaymentStatusById(
  id: number
): Promise<string | null> {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      select: { status: true },
    });

    return payment ? payment.status : null;
  } catch (error) {
    console.error("Erro ao buscar status do pagamento por ID:", error);
    throw new Error("Erro ao buscar status do pagamento");
  }
}

export async function findPaymentsByUserId(
  userId: number
): Promise<PaymentPrisma[]> {
  try {
    return await prisma.payment.findMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Erro ao buscar pagamentos por usuário:", error);
    throw new Error("Erro ao buscar pagamentos do usuário");
  }
}
