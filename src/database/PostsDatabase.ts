import { PostsDBModel } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
    private static  POSTS_TABLE = "posts"

  public getPosts = async (): Promise<PostsDBModel[]> => {
    const result: PostsDBModel[] = await BaseDatabase.connection(PostsDatabase.POSTS_TABLE);
    return result;
  };
}
