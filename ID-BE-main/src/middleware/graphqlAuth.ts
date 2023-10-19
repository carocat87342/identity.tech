import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload: { id: string, email: string };
}

const graphqlAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not authenticated");
  }
console.log("----------------------------")
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.AUTH_SECRET || 'identify');
    context.payload = payload as any;
    return next();
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
};


export default graphqlAuth;