import {useState, SyntheticEvent, useEffect} from 'react'

import {FormControl, InputLabel, Backdrop, CircularProgress} from 'components';
import Button from 'components/Button';
import useStyles from './styles'
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'store';
import * as authActions from 'store/auth/actions'
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required("Password is required"),
});

const INITIAL_DATA = {
  email: "",
  password: ""
};

const SignInContent = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  
  const userId = useSelector(state => state.user.id);

  // @ts-ignore
  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onLogin = async (values) => {
    const {email, password} = values;
    dispatch(authActions.login({email, password}));    
  }

  return (
    <>
      <p className={classes.description}>
        Sign in
      </p>
      <Formik
        enableReinitialize
        initialValues={INITIAL_DATA}
        validationSchema={Schema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={onLogin}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className={classes.formRow}>
              <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="text"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  labelWidth={40}
                />
              </FormControl>
              <span>{errors.email}</span>
            </div>
            <div className={classes.formRow}>
              <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  labelWidth={70}
                />
              </FormControl>
              <span>{errors.password}</span>
            </div>
            <br/><br/>
            <Button
              fullWidth
              color="primary"
              type="submit"
            >
              Login
            </Button>
            <br/><br/>
            <Link to="/sign-up" className={classes.btnLink}>
              <Button
                fullWidth
                type="submit"
                color="warning"
              >
                Sign Up
              </Button>
            </Link>
            <br/><br/>
            <Link to="/forgot-password" className={classes.forgot}>Forgot Password?</Link>
          </Form>
        )}
      </Formik>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        Wait for a second
      </Backdrop>
    </>
  )
}

export default SignInContent
