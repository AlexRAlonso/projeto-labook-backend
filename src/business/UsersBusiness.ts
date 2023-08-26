import { UsersDatabase } from "../database/UsersDatabase";
import { Users, UsersDBModel } from "../models/Users";

export class UsersBusiness {
  constructor(private usersDatabase: UsersDatabase) {}
  public getUsers = async (): Promise<Users[]> => {
    const usersData = await this.usersDatabase.getUsers();
    const user: Users[] = usersData.map((users) => {
      return new Users(
        users.id,
        users.name,
        users.email,
        users.password,
        users.role,
        users.created_at
      );
    });
    return user;
  };
}
