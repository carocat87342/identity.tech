import {UserType} from 'types/user'
import * as actions from './actions';

export type LoginActionType = {
  type: string;
  data: LoginInput;
}

export type RegisterActionType = {
  type: string;
  data: RegisterInput;
}

export type VerifyTokenActionType = {
  type: string;
  token: string;
}

export type LoginInput = {
  email: string;
  password: string;
}

export type RegisterInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export type AuthStateType = {
  loading: boolean;
}