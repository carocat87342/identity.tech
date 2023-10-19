import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../models/user.model";
import { FileType } from "./file";
import { UserType } from "./user";

@ObjectType()
export class ResType {
  @Field()
  result!: boolean;

  @Field()
  error?: string;
}

@ObjectType()
export class SignUpResType extends ResType {
  @Field()
  message: string;
}

@ObjectType()
export class LoginResType extends ResType{ 
  @Field()
  token: string;

  @Field({nullable: true})
  user?: UserType;
}

@ObjectType()
export class FilesResType extends ResType {
  @Field(type => [FileType])
  files: FileType[];
}

@ObjectType()
export class UpdateUserResType extends ResType {
  @Field({nullable: true})
  user?: UserType;
}

@ObjectType()
export class AddUserResType extends ResType {
  @Field({nullable: true})
  employee?: UserType;
}

@ObjectType()
export class EmployeesResType extends ResType {
  @Field(type => [UserType])
  employees: UserType[]
}