import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface MyContext extends Request {
  user: any;
};

const restAuth = (req: any, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.AUTH_SECRET || 'identify');
    console.log(payload);
    req.payload = payload;
    if (!payload) {
      throw new Error("Token is Expired!");
    }
    // req.user = payload;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};


export default restAuth;