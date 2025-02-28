import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const searchNewsSchema = z.object({
  id: z.number().int(),
});
export type SearchNewsInput = z.infer<typeof searchNewsSchema>;
export const searchResponseNewsSchema = z.object({
  title: z
    .string()  ,
  argument: z.string(),
  tags: z.array(z.string()),
  userId: z.number().int(),
  important: z.boolean(),
  cover: z.string(),
  photo1: z.string(),
  photo2: z.string(),
  photo3: z.string(),
}); 

export const newsArraySchemaResponse = z.array(searchResponseNewsSchema);
export const createNewsSchema = z.object({
  title: z
    .string()
    .min(1, "Necessário um título")
    .max(120, "Título deve ter 120 caracteres ou menos"),
  argument: z.string().max(10000, "Cover deve ter 10000 caracteres ou menos"),
  tags: z.array(z.string()),
  userId: z.number().int(),
  important: z.boolean(),
  cover: z.string().max(120, "Cover deve ter 120 caracteres ou menos"),
  photo1: z.string(),
  photo2: z.string(),
  photo3: z.string(),
});
export type CreateNewsInput = z.infer<typeof createNewsSchema>;
const createNewsResponse = z.object({
  message: z.string(),
  id: z.number().int(),
});

export const updateNewsSchema = z.object({
  title: z
    .string()
    .min(1, "Necessário um título")
    .max(120, "Título deve ter 120 caracteres ou menos")
    .optional(),
  argument: z.string().max(10000, "Cover deve ter 10000 caracteres ou menos").optional(),
  tags: z.array(z.string()).optional(),
  important: z.boolean().optional(),
  cover: z.string().max(120, "Cover deve ter 120 caracteres ou menos").optional(),
  photo1: z.string().optional(),
  photo2: z.string().optional(),
  photo3: z.string().optional(),
});

export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
const updateResponseNewsSchema = z.object({
  message: z.string(),
});

export const aiVerificationTextSchema = z.object({
  argument: z.string().max(10000, "Cover deve ter 10000 caracteres ou menos"),
});
export type AiVerificationTextInput = z.infer<typeof aiVerificationTextSchema>;

const aiVerificationResponseSchema = z.object({
  verify: z.boolean(),
});

const deleteResponseNewsSchema = z.object({
  message: z.string(),
});

export const { schemas : newsSchemas, $ref } = buildJsonSchemas({
  createNewsSchema,
  createNewsResponse,
  updateNewsSchema,
  updateResponseNewsSchema,
  searchNewsSchema,
  searchResponseNewsSchema,
  newsArraySchemaResponse,
  aiVerificationTextSchema,
  deleteResponseNewsSchema,
  aiVerificationResponseSchema,
});