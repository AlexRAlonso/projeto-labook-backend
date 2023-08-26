import { PostsDatabase } from "../database/PostsDatabase";
import { Posts, PostsDBModel } from "../models/Posts";

export class PostsBusiness {
  constructor(private postsDatabase: PostsDatabase) {}
  public getPosts = async (): Promise<Posts[]> => {
    const postsData = await this.postsDatabase.getPosts();
    const post: Posts[] = postsData.map((posts) => {
      return new Posts(
        posts.id,
        posts.creator_id,
        posts.content,
        posts.likes,
        posts.dislikes,
        posts.created_at,
        posts.updated_at
      );
    });
    return post;
  };
}
