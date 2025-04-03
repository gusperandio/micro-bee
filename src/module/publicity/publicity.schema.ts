import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { Tag as TagPrisma } from "@prisma/client";
export const searchPubSchema = z.object({
  pubId: z.number().int(),
});
export type SearchPubInput = z.infer<typeof searchPubSchema>;

export const searchResponsePubSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  photo: z.string(),
  cape: z.string(),
});
export const pubsArraySchemaResponse = z.array(searchResponsePubSchema);

export const createPubSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  photo: z.string(),
  cape: z.string(),
  userId: z.number().int(),
});
export type CreatePubInput = z.infer<typeof createPubSchema>;

const createPubResponse = z.object({
  message: z.string(),
  id: z.number().int(),
});

export const updatePubSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  photo: z.string().optional(),
  cape: z.string().optional(),
});
export type UpdatePubInput = z.infer<typeof updatePubSchema>;

const updateResponsePubSchema = z.object({
  message: z.string(),
});

const deleteResponsePubSchema = z.object({
  message: z.string(),
});

const reportPubSchema = z.object({
  idUserReporter: z.number().int(),
  idPub: z.number().int(),
  reason: z.string(),
});

const reportPubSchemaResponse = z.object({
  message: z.string(),
});
export type ReportInput = z.infer<typeof reportPubSchema>;

export const { schemas: newsSchemas, $ref } = buildJsonSchemas(
  {
    searchPubSchema,
    searchResponsePubSchema,
    pubsArraySchemaResponse,
    createPubSchema,
    createPubResponse,
    updatePubSchema,
    updateResponsePubSchema,
    deleteResponsePubSchema,
    reportPubSchema,
    reportPubSchemaResponse,
  },
  { $id: "pubSchema" }
);
