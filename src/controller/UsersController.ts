import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";

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
}
