import * as actions from './actions'
import { LoginActionType, RegisterActionType, AuthStateType } from './types'

const defaultState = {
  loading: false
}

const reducer = (state: AuthStateType = defaultState, action: LoginActionType | RegisterActionType) => {
  switch (action.type) {
    case actions.USER_START_LOADING:
      return {
        ...state,
        loading: true
      }
    case actions.USER_FINISH_LOADING:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
};

export default reducer;
