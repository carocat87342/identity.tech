import { useLogin, useRegister, useVerifyToken } from 'apollo/hooks/auth';
import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as actions from './actions';
import * as userActions from '../user/actions';
import { toast } from 'react-toastify';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
  yield put({type: userActions.USER_START_LOADING});

  const {email, password} = action.data;
  const {data: {login}} = yield call(useLogin, {email, password});

  if (login.result) {
    const token = login.token;
    toast.success('Login Success', {
      position: 'bottom-right',
      theme: 'light',
    });
    const {id, firstName, lastName, role} = login.user;
    yield put({type: userActions.USER_SET, user: {
      id, email: email, firstName, lastName, token, role
    }});
  } else {
    toast.error('Login Failed', {
      position: 'bottom-right',
      theme: 'light',
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* register(action) {
  yield put({type: userActions.USER_START_LOADING});

  const {email, password, firstName, lastName, role} = action.data;
  const {data: {createUser: res}} = yield call(useRegister, {email, password, firstName, lastName, role});
  if (res.result) {
    toast.success('You\'re registered successfully, please login.', {
      position: 'bottom-right',
      theme: 'light',
    });
  } else {
    toast.error(res.message, {
      position: 'bottom-right',
      theme: 'light',
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* verifyToken(action) {
  const {token} = action;
  try {
    const res = yield call(useVerifyToken, token);
    const {data: {verifyToken: user}} = res;
    yield put({type: userActions.USER_SET, user: {
      ...user, token
    }}); 
  } catch (e) {
    toast.error(e.message, {
      position: 'bottom-right',
      theme: 'light'
    });
    yield put({type: userActions.USER_REMOVE});
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* authSaga() {
  yield all([
    takeLatest(actions.AUTH_LOGIN_REQUEST, login),
    takeLatest(actions.AUTH_REGISTER_REQUEST, register),
    takeLatest(actions.AUTH_VERIFY_TOKEN, verifyToken),
  ]);
}

export default authSaga;