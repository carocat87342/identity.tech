import { UserModel } from "../../models/user.model"

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  parent?: UserModel;
}

export type LoginInput = {
  email: string;
  password: string;
}

export enum USERROLE {
  ADMIN = "admin",
  EMPLOYEE = "employee"
};