import * as z from "zod";

export const pageSchema = z.object({
  title: z.string().min(4),
});

export type pageSchemaType = z.infer<typeof pageSchema>;
