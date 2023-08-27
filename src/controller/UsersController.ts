import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { SignupSchema } from "../dtos/signup.dto";
import { LoginSchema } from "../dtos/login.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";

export class UsersController {
  constructor(private usersBusiness: UsersBusiness) {}

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.usersBusiness.getUsers();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      const result = await this.usersBusiness.signup(input);
      res.status(201).send("Signup successful!");
      //res.status(201).send(input);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.usersBusiness.login(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Unexpected error!")
      }
    }
  }
}
