import { fork } from '@redux-saga/core/effects'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {useSelector as reduxUseSelector} from 'react-redux'
import userReducer from './user/reducers'
import userSaga from './user/saga'
import authReducer from './auth/reducers';
import authSaga from './auth/saga';
import {StoreType} from './types'

export * from 'react-redux'
const sagaMiddleware = createSagaMiddleware()

export default createStore(combineReducers({user: userReducer, auth: authReducer}), applyMiddleware(sagaMiddleware))

function* rootSaga () {
  yield fork(userSaga)
  yield fork(authSaga)
}
sagaMiddleware.run(rootSaga)

export function useSelector(selector: (store: StoreType) => any) {
  return reduxUseSelector(selector)
}
