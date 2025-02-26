import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6).max(40),
  name: z.string(),
  age: z.number(),
  role: z.string().optional(),
});

const createOrLoginSocialUserSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
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
  email: z.string().optional(),
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

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createOrLoginSocialUserSchema,
  loginSchema,
  loginResponseSchema,
  deleteUserSchema,
  deleteResponseUserSchema,
  updateUserSchema,
  updateResponseUserSchema,
});
