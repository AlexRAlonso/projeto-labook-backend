import express from "express";
import { PostsController } from "../controller/PostsController";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsDatabase } from "../database/PostsDatabase";

export const postsRouter = express.Router();

const postsController = new PostsController(
  new PostsBusiness(new PostsDatabase())
);

postsRouter.get("/", postsController.getPosts);
