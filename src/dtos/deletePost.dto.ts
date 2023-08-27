import z from "zod";

export interface DeletePostInputDTO {
  id: string;
}

export const DeletePostSchema = z
  .object({
    id: z.string().startsWith("p"),
  })
  .transform((data) => data as DeletePostInputDTO);
