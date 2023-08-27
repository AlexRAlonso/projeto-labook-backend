import { DeletePostInputDTO } from "../dtos/deletePost.dto";
import { PostsDBModel } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
  private static POSTS_TABLE = "posts";

  public getPosts = async (): Promise<PostsDBModel[]> => {
    const result: PostsDBModel[] = await BaseDatabase.connection(
      PostsDatabase.POSTS_TABLE
    );
    return result;
  };

  public createPost = async (input: PostsDBModel): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).insert(input);
  };

  public editPost = async (input: PostsDBModel): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
      .update(input)
      .where({ id: input.id });
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
      .del()
      .where({ id: input.id });
  };
}
