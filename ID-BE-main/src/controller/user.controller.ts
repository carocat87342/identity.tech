import { NextFunction,  Response } from 'express';
import { UpdateUserInput } from '../inputs/user';
import { CreateInvitationToken, CreateResetPasswordToken, VerifyJwtToken } from '../services/common';
import { sendInvitation, sendResetPassword } from '../services/email';
import { deleteEmployee, getUser, getUserByEmail, updateUserProfile } from '../services/user';

// private
export const invite = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email} = req.query;
        const admin = await getUser(req.payload.id);
        const employee = await getUserByEmail(email);
        try {
          if (admin && employee) {
            const token = CreateInvitationToken(`${employee.id}`, employee.email);
            await sendInvitation(email, employee.firstName, admin.firstName, employee.password, token);
            res.status(200).json({
              result: true
            });
          }
        } catch (error) {
          res.status(200).json({
            result: false,
            error: 'User with given email is not found'
          });
        }
    } catch (error) {
        next(error);
    }
};

// private
export const deleteUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
      const {id} = req.query;
      const result = await deleteEmployee(id);
      res.status(200).json({
        result
      });
  } catch (error) {
      next(error);
  }
};

// public
export const forgotPassword = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
      const {email} = req.query;
      const token = CreateResetPasswordToken(email);
      const user = await getUserByEmail(email);
      if (user) {
        const result = await sendResetPassword(email, user.firstName, token);
        res.status(200).json({
          result: true
        });
      } else {
        res.status(200).json({
          result: false,
          error: 'User with this email was not found'
        })
      }
  } catch (error) {
      next(error);
  }
};


// public
export const resetPassword = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
      const {password, token} = req.query;
      const {email} = VerifyJwtToken(token);
      if (!email) {
        res.status(200).json({
          result: false,
          error: "Token is expired or invalid, please try to resend"
        });
        return;
      }
      const user = await getUserByEmail(email);
      if (user && user.id) {
        const input = new UpdateUserInput();
        input.password = password;
        await updateUserProfile(user?.id.toString(), input);
        res.status(200).json({
          result: true
        });
      } else {
        res.status(200).json({
          result: false,
          error: "User not found"
        });
      }
  } catch (error) {
      next(error);
  }
};

// public
export const acceptInvitation = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {token} = req.query;
    const {id, email} = VerifyJwtToken(token);
    console.log('~~~~~~~~~~');
    console.log(id, email);
    if (!email || !id) {
      res.status(200).json({
        result: false,
        error: "Token is invalid"
      });
      return;
    }
    const user = await getUserByEmail(email);
    if (user && user.id) {
      const input = new UpdateUserInput();
      input.emailVerified = true;
      await updateUserProfile(user?.id.toString(), input);
      res.status(200).json({
        result: true
      });
    } else {
      res.status(200).json({
        result: false,
        error: "User not found"
      });
    }
  } catch (error) {
      next(error);
  }
};

