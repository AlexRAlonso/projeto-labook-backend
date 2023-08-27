import express from "express";
import cors from "cors";
import { postsRouter } from "./router/postsRouter";
import { usersRouter } from "./router/usersRouter";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server is running on port ${process.env.PORT || 3003}`);
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
