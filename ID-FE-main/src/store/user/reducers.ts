import * as actions from './actions'
import {UserStateType} from './types'
import {ACCESS_TOKEN} from 'utils/constant';
import { removeItem, setItem } from 'utils/localStorage';

const defaultState = {
  id: null,
  email: null,
  token: null,
  firstName: null,
  lastName: null,
  role: null,
  files: [],
  password: '',
  emailVerified: false,
  activePeople: false,
  weeklyReport: null,
  parent: null,
  employees: [],
  utilizationNotifications: false,
  loading: false
};

const reducer = (state: UserStateType = defaultState, action: any) => {
  switch (action.type) {
    case actions.USER_SET:
      setItem(ACCESS_TOKEN, action.user.token);
      return {
        ...action.user
      }
    case actions.USER_REMOVE:
      removeItem(ACCESS_TOKEN);
      window.location.href = '/';
      return {
        ...defaultState
      }
    case actions.USER_FILES_RESPONSE:
      return {
        ...state,
        files: action.files
      }
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
    case actions.USER_GET_EMPLOYEES_RESPONSE:
      return {
        ...state,
        employees: action.employees
      }
    default:
      return state
  }
};

export default reducer;
