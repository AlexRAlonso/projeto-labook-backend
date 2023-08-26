export class Users {
    constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: string,
      private createdAt: string
    ) {}
  }
  
  export interface UsersDBModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
  }
  