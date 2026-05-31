import { z } from "zod";

/** Shared Zod primitives for forms and API validation */
export const idSchema = z.string().cuid();
export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
