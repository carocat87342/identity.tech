import { ObjectType, Field, registerEnumType, ID } from "type-graphql";
import jwt from "jsonwebtoken";
import { type } from "os";

@ObjectType()
export class QRType {
  @Field()
  code: string;

  @Field()
  image: string;
}

@ObjectType()
export class AccountType {
  model: any;

  @Field(() => ID, { nullable: false })
  id?: string;

  @Field({ nullable: false })
  userName: string;

  @Field({ nullable: false })
  displayName: string;

  @Field({ nullable: false })
  image: string;

  @Field()
  isMerchant: boolean;

  @Field()
  type: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field()
  accountToken: string;

  @Field(() => Boolean)
  isPrivate?: boolean;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  phone: string;
}
