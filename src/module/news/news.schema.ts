import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { Tag as TagPrisma } from "@prisma/client";
export const searchNewsSchema = z.object({
  newsId: z.number().int(),
});
export type SearchNewsInput = z.infer<typeof searchNewsSchema>;

export const searchResponseNewsSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  argument: z.string(),
  tags: z.array(z.string()),
  userId: z.number().int(),
  important: z.boolean(),
  minReads: z.number().int().optional(),
  cape: z.string(),
  photo1: z.string(),
  photo2: z.string(),
  photo3: z.string(),
});
export const newsArraySchemaResponse = z.array(searchResponseNewsSchema);

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(20, "Título deve ter mais de 20 caracteres")
    .max(120, "Título deve ter 120 caracteres ou menos"),
  argument: z
    .string()
    .max(10000, "Conteúdo deve ter 10000 caracteres ou menos"),
  tags: z.array(z.custom<TagPrisma>()),
  userId: z.number().int(),
  important: z.boolean(),
  cape: z.string(),
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
  id: z.number().int(),
  title: z
    .string()
    .min(20, "Título deve ter mais de 20 caracteres")
    .max(120, "Título deve ter 120 caracteres ou menos")
    .optional(),
  argument: z
    .string()
    .max(10000, "Conteúdo deve ter 10000 caracteres ou menos")
    .optional(),
  tags: z.array(z.custom<TagPrisma>()).optional(),
  important: z.boolean().optional(),
  cape: z.string().optional(),
  photo1: z.string().optional(),
  photo2: z.string().optional(),
  photo3: z.string().optional(),
});
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;

const updateResponseNewsSchema = z.object({
  message: z.string(),
});

export const aiVerificationTextSchema = z.object({
  argument: z
    .string()
    .max(10000, "Conteúdo deve ter 10000 caracteres ou menos"),
});
export type AiVerificationTextInput = z.infer<typeof aiVerificationTextSchema>;

const aiVerificationResponseSchema = z.object({
  verify: z.boolean(),
});

const deleteResponseNewsSchema = z.object({
  message: z.string(),
});

export const { schemas: newsSchemas, $ref } = buildJsonSchemas(
  {
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
  },
  { $id: "newsSchema" }
);
