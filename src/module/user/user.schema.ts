import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6).max(40),
  name: z.string(),
  age: z.number(),
  role: z.string().optional(),
  country: z.string().optional(),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;


const createOrLoginSocialUserSchema = z.object({
  email: z.string(),
  name: z.string(),
});
export type CreateOrLoginSocialUserInput = z.infer<
  typeof createOrLoginSocialUserSchema
>;


const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6).max(40),
});
export type LoginUserInput = z.infer<typeof loginSchema>;


const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  access_token: z.string(),
  expire_in: z.number(),
  token_type: z.string(),
});

const updateUserSchema = z.object({
  id: z.number(), 
  password: z.string().min(6).max(40).optional(),
  name: z.string().optional(),
  age: z.number().optional(),
  role: z.string().optional(),
  premiumTime: z.date().optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

const updateResponseUserSchema = z.object({
  message: z.string(),
});

const deleteUserSchema = z.object({
  id: z.number(),
});
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;

const deleteResponseUserSchema = z.object({
  message: z.string(),
});

const creditCardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardHolderName: z.string(),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export type CreditCardInput = z.infer<typeof creditCardSchema>;
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createOrLoginSocialUserSchema,
  loginSchema,
  loginResponseSchema,
  deleteUserSchema,
  deleteResponseUserSchema,
  updateUserSchema,
  updateResponseUserSchema,
}, { $id: 'userSchema' });
