import { UsersDatabase } from "../database/UsersDatabase";
import { SignupInputDTO } from "../dtos/signup.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto";
import { USER_ROLES, Users, UsersDBModel } from "../models/Users";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UsersBusiness {
  constructor(
    private usersDatabase: UsersDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

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

  public signup = async (input: SignupInputDTO): Promise<void> => {
    const { name, email, password } = input;

    const userDBExists = await this.usersDatabase.getUserByEmail(email);
    if (userDBExists) {
      throw new BadRequestError("A user with this e-mail already exists!");
    }

    const id = this.idGenerator.generateId();
    const today = new Date().toISOString();

    const user = new Users(id, name, email, password, USER_ROLES.NORMAL, today);
    await this.usersDatabase.signup(user.toDBModel());

    const token = this.tokenManager.createToken({
      id: user.getId(),
      role: user.getRole(),
    });
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.usersDatabase.getUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("E-mail not found!");
    }

    if (password !== userDB.password) {
      throw new BadRequestError("Wrong E-mail or Password!");
    }

    const token = this.tokenManager.createToken({
      id: userDB.id,
      role: userDB.role
    });

    const output: LoginOutputDTO = {
      message: "Login Successful!",
      token,
    };

    return output;
  };

}
