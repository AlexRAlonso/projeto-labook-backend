import z from "zod";

export interface EditPostInputDTO {
  id: string;
  content?: string;
}

export const EditPostSchema = z
  .object({
    id: z.string().startsWith("p"),
    content: z.string().max(500).optional(),
  })
  .transform((data) => data as EditPostInputDTO);
