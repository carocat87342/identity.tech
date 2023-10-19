import {LoginActionType, LoginInput, RegisterActionType, RegisterInput, VerifyTokenActionType} from './types'

export const AUTH_LOGIN_REQUEST = 'AUTH:LOGIN:REQUEST';
export const AUTH_LOGIN_RESPONSE = 'AUTH:LOGIN:RESPONSE';
export const AUTH_REGISTER_REQUEST = 'AUTH:REGISTER:REQUEST';
export const AUTH_REGISTER_RESPONSE = 'AUTH:REGISTER:RESPONSE';
export const AUTH_VERIFY_TOKEN = 'AUTH:VERIFY_TOKEN';

export const USER_START_LOADING = 'USER:START_LOADING';
export const USER_FINISH_LOADING = 'USER:FINISH_LOADING';

export function login(data: LoginInput): LoginActionType {
  return {
    type: AUTH_LOGIN_REQUEST,
    data
  }
}

export function register(data: RegisterInput): RegisterActionType {
  return {
    type: AUTH_REGISTER_REQUEST,
    data
  }
}

export function verifyToken(token: string): VerifyTokenActionType {
  return {
    type: AUTH_VERIFY_TOKEN,
    token
  }
}