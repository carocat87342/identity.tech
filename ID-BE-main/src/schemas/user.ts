import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../models/user.model";

@ObjectType()
export class UserType {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  password: string;
  
  @Field()
  email!: string;

  @Field()
  role!: string;

  @Field(({ nullable: true }))
  emailVerified: boolean;

  @Field(({ nullable: true }))
  activePeople: boolean;

  @Field(({ nullable: true }))
  weeklyReport: string;

  @Field(({ nullable: true }))
  utilizationNotifications: boolean;

  constructor(initializer: UserModel) {
    this.id = initializer.id;
    this.firstName = initializer.firstName;
    this.lastName = initializer.lastName;
    this.email = initializer.email;
    this.password = initializer.password;
    this.role = initializer.role;
    this.activePeople = initializer.activePeople || false;
    this.weeklyReport = initializer.weeklyReport;
    this.utilizationNotifications = initializer.utilizationNotifications || false;
  }
}