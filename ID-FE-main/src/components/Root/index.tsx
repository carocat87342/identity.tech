import {Router, Redirect, Switch} from 'react-router-dom'

import {CssBaseline} from 'components'
import Route from 'components/Route'
import UnsignedLayout from 'components/UnsignedLayout'
import history from 'routing/routerHistory'
import routes from 'routing/routes'
import { ToastContainer } from 'react-toastify';

import useStyles from './styles'
import 'react-toastify/dist/ReactToastify.min.css';
import Dashboard from 'pages/Dashboard'

const signedPaths = Object.values(routes.signed)
const unsignedPaths = Object.values(routes.unsigned)

const Root = () => {
  // Inject @global styles
  useStyles()

  // Simulate fetching of user data from localStorage

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route requiresAuth path={signedPaths} component={Dashboard} />
          <Route inaccessibleWithToken path={unsignedPaths} component={UnsignedLayout} />
          <Redirect to={routes.signed.dashboard} />
        </Switch>
      </Router>
    </>
  )
}

export default Root
