import express from "express";
import { UsersController } from "../controller/UsersController";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersDatabase } from "../database/UsersDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router();

const idGenerator = new IdGenerator();
const tokenManager = new TokenManager();
const usersDatabase = new UsersDatabase();
const usersBusiness = new UsersBusiness(usersDatabase, idGenerator, tokenManager);
const usersController = new UsersController(usersBusiness);

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/signup", usersController.signup);
usersRouter.post("/login", usersController.login);
