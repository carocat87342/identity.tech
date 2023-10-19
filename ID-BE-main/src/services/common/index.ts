import { UserModel } from "../../models/user.model"
import jwt from 'jsonwebtoken'

export const CreateJwtToken = (user: UserModel) => {
  const {id, email} = user;
  const token = jwt.sign(
    {id, email},
    process.env.AUTH_SECRET || 'identify',
    { expiresIn: 2 * 3600 }
  );
  return token;
}

export const CreateResetPasswordToken = (email: string) => {
  const token = jwt.sign(
    {email},
    process.env.AUTH_SECRET || 'identify',
    { expiresIn: 15 * 60 }
  );
  return token;
}

export const CreateInvitationToken = (id: string, email: string) => {
  const token = jwt.sign(
    {id, email},
    process.env.AUTH_SECRET || 'identify',
  );
  return token;
}

export const VerifyJwtToken = (token: string) => {
  try {
    const decode: any = jwt.decode(token);
    if (decode) {
      return decode;
    }
  } catch (error) {
    throw error;
  }
}