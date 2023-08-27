import { UsersDBModel } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
  private static USERS_TABLE = "users";

  public getUsers = async (): Promise<UsersDBModel[]> => {
    const result: UsersDBModel[] = await BaseDatabase.connection(
      UsersDatabase.USERS_TABLE
    );
    return result;
  };

  public async getUserByEmail(
    email: string
  ): Promise<UsersDBModel | undefined> {
    const [userDB]: UsersDBModel[] | undefined[] =
      await BaseDatabase.connection(UsersDatabase.USERS_TABLE).where({ email });

    return userDB;
  }

  public signup = async (input: UsersDBModel): Promise<void> => {
    await BaseDatabase.connection(UsersDatabase.USERS_TABLE).insert(input);
  };
}
