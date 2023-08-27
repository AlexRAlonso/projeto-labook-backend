import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreatePostSchema } from "../dtos/createPost.dto";
import { EditPostSchema } from "../dtos/editPost.dto";
import { DeletePostSchema } from "../dtos/deletePost.dto";

export class PostsController {
  constructor(private postsBusiness: PostsBusiness) {}

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.postsBusiness.getPosts();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreatePostSchema.parse({
        creator_id: req.body.creator_id,
        content: req.body.content,
      });

      const result = await this.postsBusiness.createPost(input);
      res.status(201).send("Post Published!");
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public editPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = EditPostSchema.parse({
        id: req.params.id,
        content: req.body.content,
      });

      const result = await this.postsBusiness.editPost(input);
      res.status(200).send("Post updated!");
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = DeletePostSchema.parse({
        id: req.params.id,
      });

      const result = await this.postsBusiness.deletePost(input);
      res.status(200).send("Post deleted!");
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
