import { ArgsType, InputType, Field } from "type-graphql";
import { UserModel } from "../models/user.model";

@InputType()
@ArgsType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}

@InputType()
@ArgsType()
export class LoginInput implements Partial<UserModel>{
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
@ArgsType()
export class UpdateUserInput implements Partial<UserModel> {
  @Field(({ nullable: true }))
  firstName: string;

  @Field(({ nullable: true }))
  lastName: string;
  
  @Field(({ nullable: true }))
  email: string;

  @Field(({ nullable: true }))
  password: string;

  @Field(({ nullable: true }))
  activePeople: boolean;

  @Field(({ nullable: true }))
  emailVerified: boolean;

  @Field(({ nullable: true }))
  weeklyReport: string;

  @Field(({ nullable: true }))
  utilizationNotifications: boolean;
}

@InputType()
@ArgsType()
export class UpdateRoleInput {
  @Field()
  employeeId: string;

  @Field()
  role: string;
}