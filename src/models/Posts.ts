export class Posts {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string
  ) {}
}

export interface PostsDBModel {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}
