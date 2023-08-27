import z from "zod";

export interface CreatePostInputDTO {
  creator_id: string;
  content: string;
}

export const CreatePostSchema = z
  .object({
    creator_id: z.string(),
    content: z.string().max(500),
  })
  .transform((data) => data as CreatePostInputDTO);
