import React, { useEffect } from 'react'
import {Container} from 'components'
import {Route, Switch, Redirect} from 'react-router-dom'
import {useHistory} from 'react-router';

import SignInContainer from 'pages/SignIn'
import routes from 'routing/routes'
import SignUpContainer from 'pages/Signup'
import useStyles from './styles'
import ForgotPasswordContainer from 'pages/ForgotPassword'
import imgTeamWork from 'assets/images/teamwork.png';
import imgIcon from 'assets/images/icon-colored.png';
import imgIdentify from 'assets/images/identify-white.png';
import Button from 'components/Button';
import AcceptInvitation from 'pages/AcceptInvitation';
import ResetPassword from 'pages/ResetPassword';

const UnsignedLayout = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="xl" className={classes.layout}>
      <div className={classes.signInWrapper}>
        <div className={classes.leftPanel}>
          <div className={classes.top}>
            <div>
              <img src={imgIcon} alt='logo' height='45px' />
              <img src={imgIdentify} alt='identify' height='38px'  />
            </div>
          </div>
          <img src={imgTeamWork} alt='teamwork' />
          <p className={classes.note}>Identify Your Customer's Needs in One Click.</p>
        </div>
        <div className={classes.rightPanel}>
            <Switch>
              <Route exact path={routes.unsigned.signin} component={SignInContainer} />
              <Route exact path={routes.unsigned.signup} component={SignUpContainer} />
              <Route exact path={routes.unsigned.forgotPassword} component={ForgotPasswordContainer} />
              <Route exact path={routes.unsigned.acceptInvitation} component={AcceptInvitation} />
              <Route exact path={routes.unsigned.resetPassword} component={ResetPassword} />
              <Redirect to={routes.unsigned.signin} />
            </Switch>
        </div>
      </div>
    </Container>
  )
}

export default UnsignedLayout
