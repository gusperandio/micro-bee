import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6).max(40),
  name: z.string(),
});

const createUserSocialSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>; 

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
// to build our JSON schema, we use buildJsonSchemas from fastify-zod
// it returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserSocialSchema, 
  loginSchema,
  loginResponseSchema,
});
