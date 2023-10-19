import {useState, SyntheticEvent, useEffect} from 'react'

import {FormControl, InputLabel, Backdrop, CircularProgress} from 'components';
import Button from 'components/Button';
import useStyles from './styles'
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useHistory} from 'react-router';
import { forgotPassword } from 'api/entries';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
})

const INITIAL_DATA = {
  email: '',
};

const ResetPassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    const {email} = values;
    const res = await forgotPassword(email);
    if (res.result) {
      toast.success("The link to reset password was sent, please check your email", {
        position: 'bottom-right',
        theme: 'light'
      });
    } else {
      toast.error(res.error, {
        position: 'bottom-right',
        theme: 'light'
      });
    }
    setLoading(false);
  }

  return (
    <>
      <p className={classes.description}>
        Forgot Password
      </p>
      <Formik
        enableReinitialize
        initialValues={INITIAL_DATA}
        validationSchema={Schema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={values => {
          submit(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className={classes.formRow}>
              <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
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
            <br/><br/>
            <Button
              fullWidth
              color="primary"
              type="submit"
            >
              Send Reset Password Link
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

export default ResetPassword;
