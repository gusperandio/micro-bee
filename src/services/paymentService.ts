import { PrismaClient } from "@prisma/client";
import { PaymentType } from "../types/Payment";

const prisma = new PrismaClient();

// export const createPayment = async (
//   data: PaymentType
// ): Promise<PaymentType> => {
//   return prisma.payment.create({ data });
// };

// export const getPaymentById = async (
//   id: number
// ): Promise<PaymentType | null> => {
//   return prisma.payment.findUnique({ where: { id } });
// };

// export const updatePayment = async (
//   id: number,
//   data: Partial<PaymentType>
// ): Promise<PaymentType> => {
//   return prisma.payment.update({ where: { id }, data });
// };

// export const deletePayment = async (id: number): Promise<PaymentType> => {
//   return prisma.payment.delete({ where: { id } });
// };
