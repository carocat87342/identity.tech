import React, { SyntheticEvent} from 'react'

import {FormControl, InputLabel, Backdrop, CircularProgress} from 'components';
import Button from 'components/Button';
import useStyles from './styles'
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'store';
import * as authActions from 'store/auth/actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required("Password is required"),
});

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

const SignUpContent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  
  const onRegister = async (values) => {
    const {email, password, firstName, lastName} = values;
    const role = "normal";
    dispatch(authActions.register({email, password, firstName, lastName, role}));    
  }

  return (
    <>
      <p className={classes.description}>
        Create Your Free Account
      </p>
      <Formik
        enableReinitialize
        initialValues={INITIAL_DATA}
        validationSchema={Schema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={onRegister}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className={classes.formRow}>
              <FormControl fullWidth  className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  id="firstName"
                  type='text'
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  labelWidth={80}
                />
              </FormControl>
              <span>{errors.firstName}</span>
            </div>
            <div className={classes.formRow}>
              <FormControl fullWidth  className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="lastName"
                  type='text'
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  labelWidth={80}
                />
              </FormControl>
              <span>{errors.lastName}</span>
            </div>
            <div className={classes.formRow}>
              <FormControl fullWidth  className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  labelWidth={40}
                />
              </FormControl>
              <span>{errors.email}</span>
            </div>
            <div className={classes.formRow}>
              <FormControl fullWidth  className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type='password'
                  name="password"
                  value={values.password}
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
              Create Account
            </Button>
            <br/><br/>
            <Link to="/login" className={classes.btnLink}>
              <Button
                fullWidth
                type="submit"
                color="warning"
              >
                Login
              </Button>
            </Link>
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

export default SignUpContent
