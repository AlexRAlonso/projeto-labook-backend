import express from "express";
import cors from "cors";
import { postsRouter } from "./router/postsRouter";
import { usersRouter } from "./router/usersRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log("Server is running on door 3003");
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
