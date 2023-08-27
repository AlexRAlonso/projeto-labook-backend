export class Users {
    constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: string,
      private createdAt: string
    ) {}

    public toDBModel():UsersDBModel{
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        created_at: this.createdAt
      }
    }
  }
  
  export interface UsersDBModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
  }
  