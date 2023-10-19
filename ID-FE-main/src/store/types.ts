import {UserStateType} from './user/types'
import {ThunkAction} from 'redux-thunk'
import {Action} from 'redux'
import { AuthStateType } from './auth/types'

export type StoreType = {
  user: UserStateType,
  auth: AuthStateType
}

export type ThunkResultType<R> = ThunkAction<R, StoreType, any, Action>
