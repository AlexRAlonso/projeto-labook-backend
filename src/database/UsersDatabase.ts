import { UsersDBModel } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    private static  USERS_TABLE = "users"

  public getUsers = async (): Promise<UsersDBModel[]> => {
    const result: UsersDBModel[] = await BaseDatabase.connection(UsersDatabase.USERS_TABLE);
    return result;
  };
}
