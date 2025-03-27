import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePaymentInput, SearchPaymentInput } from "./payments.schema";
import {
  findAllPayments,
  findPaymentsById,
  findPaymentsByUserId,
  findPaymentStatusById,
  insertPayment,
} from "./payments.repository";
import { formattedDate } from "../../util/dateBr";

export async function createPayment(
  req: FastifyRequest<{ Body: CreatePaymentInput }>,
  reply: FastifyReply
) {
  try {
    const newPayment = req.body;
    const payment = await insertPayment(newPayment);

    return reply.code(201).send({
      message: "Payment created successfully",
      id: payment.id,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao criar pagamento",
    });
  }
}

export async function getAllPayment(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payments = await findAllPayments();
    return reply.code(200).send({ 
      data: [payments],
    });
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar pagamentos",
    });
  }
}

export async function getPaymentById(
  req: FastifyRequest<{ Params: SearchPaymentInput }>,
  reply: FastifyReply
) {
  try {
    const { paymentId } = req.params;
    const payment = await findPaymentsById(paymentId);

    if (!payment) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Pagamento não encontrado",
      });
    }

    return reply.code(200).send({
      price: payment.amount,
      method: payment.method,
      status: payment.status,
      date: formattedDate(payment.createdAt),
    });
  } catch (error) {
    console.error("Erro ao buscar pagamento:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar pagamento",
    });
  }
}

export async function getStatusPayment(
  req: FastifyRequest<{ Params: SearchPaymentInput }>,
  reply: FastifyReply
) {
  try {
    const { paymentId } = req.params;
    const status = await findPaymentStatusById(paymentId);

    if (status === null) {
      return reply.code(404).send({
        statusCode: 404,
        message: "Status do pagamento não encontrado",
      });
    }

    return reply.code(200).send({
      statusCode: 200,
      message: "Status do pagamento encontrado",
      data: { status },
    });
  } catch (error) {
    console.error("Erro ao buscar status do pagamento:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar status do pagamento",
    });
  }
}

export async function getPaymentByUserId(
  req: FastifyRequest<{ Params: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { userId } = req.params;
    const userPayments = await findPaymentsByUserId(userId);

    if (!userPayments.length) {
      return reply.code(204).send({
        statusCode: 204,
        message: "Nenhum pagamento encontrado para este usuário",
      });
    }

    return reply.code(200).send({ 
      data: [userPayments],
    });
  } catch (error) {
    console.error("Erro ao buscar pagamentos do usuário:", error);
    return reply.code(500).send({
      statusCode: 500,
      message: "Erro ao buscar pagamentos do usuário",
    });
  }
}
