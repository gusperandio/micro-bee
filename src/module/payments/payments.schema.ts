import { buildJsonSchemas } from "fastify-zod";
import { stat } from "fs";
import { date, z } from "zod";

// todo --------------------------------------------------------------
export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum([
    "PIX",
    "CREDIT_CARD",
    "IN_APP_PURCHASE",
  ]),
  userId: z.number().int(),
  status: z.string(),
});
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

const createPaymentResponse = z.object({
  message: z.string(),
  id: z.number().int(),
});
//! ------------------------------------------------------------------

// todo --------------------------------------------------------------
export const searchPaymentSchema = z.object({
  paymentId: z.number().int(),
});
export type SearchPaymentInput = z.infer<typeof searchPaymentSchema>;

export const searchResponsePaymentSchema = z.object({ 
  price: z.number(),
  method: z.number().int(),
  status: z.string(),
  date: z.string(),
});
export const paymentArraySchemaResponse = z.array(searchResponsePaymentSchema);
//! ------------------------------------------------------------------

// todo --------------------------------------------------------------
const verifyResponsePaymentSchema = z.object({
  message: z.string(),
  status: z.string(),
});
//! ------------------------------------------------------------------

export const { schemas: PaymentSchemas, $ref } = buildJsonSchemas(
  {
    createPaymentSchema,
    createPaymentResponse,
    searchPaymentSchema,
    searchResponsePaymentSchema,
    paymentArraySchemaResponse,
    verifyResponsePaymentSchema,
  },
  { $id: "PaymentSchema" }
);
