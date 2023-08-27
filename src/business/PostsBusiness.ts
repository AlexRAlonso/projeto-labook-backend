import { PostsDatabase } from "../database/PostsDatabase";
import { UsersDatabase } from "../database/UsersDatabase";
import { CreatePostInputDTO } from "../dtos/createPost.dto";
import { DeletePostInputDTO } from "../dtos/deletePost.dto";
import { EditPostInputDTO } from "../dtos/editPost.dto";
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

  public createPost = async (input: CreatePostInputDTO): Promise<void> => {
    const { creator_id, content } = input;
    const usersDatabase = new UsersDatabase();
    const users = await usersDatabase.getUsers();
    const userExists = users.find((element) => element.id === creator_id);

    if (!userExists) {
      throw new Error("User doesn't exist!");
    }

    const id: string = "p" + Math.floor(Math.random() * 256).toString();
    const today = new Date().toISOString();

    const likes = 0;
    const dislikes = 0;
    const updated_at = today;

    const post = new Posts(
      id,
      creator_id,
      content,
      likes,
      dislikes,
      today,
      updated_at
    );
    await this.postsDatabase.createPost(post.toDBModel());
  };

  public editPost = async (input: EditPostInputDTO): Promise<void> => {
    const { id, content } = input;

    const postsDatabase = new PostsDatabase();
    const posts = await postsDatabase.getPosts();
    const postExists = posts.find((element) => element.id === id);

    if (!postExists) {
      throw new Error("Post not found!");
    }

    const today = new Date().toISOString();

    const postUpdate = new Posts(
      id,
      postExists.creator_id,
      content || postExists.content,
      postExists.likes,
      postExists.dislikes,
      postExists.created_at,
      today
    );
    await this.postsDatabase.editPost(postUpdate.toDBModel());
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
    const { id } = input;

    const postsDatabase = new PostsDatabase();
    const posts = await postsDatabase.getPosts();
    const postExists = posts.find((element) => element.id === id);

    if (!postExists) {
      throw new Error("Post not found!");
    }
   
    await this.postsDatabase.deletePost(input);
  };
}
