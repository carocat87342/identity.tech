import {useEffect} from 'react'
import {Route as ReactRoute, RouteProps} from 'react-router-dom'
import useReactRouter from 'use-react-router'

import {useDispatch, useSelector} from 'store'
import routes from 'routing/routes'
import { getItem } from 'utils/localStorage'
import {ACCESS_TOKEN} from 'utils/constant';
import * as actions from 'store/auth/actions';

type Props = RouteProps & {
  requiresAuth?: boolean
  inaccessibleWithToken?: boolean
}

const Route = (props: Props) => {
  const token = getItem(ACCESS_TOKEN);
  const {component: Component, requiresAuth, inaccessibleWithToken, ...rest} = props;
  const {history} = useReactRouter();
  const userId = useSelector(state => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token && requiresAuth) {
      history.push(routes.unsigned.signin)
    } else if (token) {
      if (!userId) {
        dispatch(actions.verifyToken(token));
      }
      if (inaccessibleWithToken) history.push(routes.signed.dashboard)      
    }
  }, [userId, history, token, dispatch, inaccessibleWithToken, requiresAuth])

  if (!token && requiresAuth) return null
  if (token && inaccessibleWithToken) return null

  return <ReactRoute {...rest} component={Component} />
}

export default Route
