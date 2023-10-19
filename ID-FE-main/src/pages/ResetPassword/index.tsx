import {useState, SyntheticEvent, useEffect} from 'react'

import {FormControl, InputLabel, Backdrop, CircularProgress} from 'components';
import Button from 'components/Button';
import useStyles from './styles'
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useHistory} from 'react-router';
import { resetPassword } from 'api/entries';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Schema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required"),
  passwordAgain: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required("Please confirm password"),
})

const INITIAL_DATA = {
  newPassword: '',
  passwordAgain: ''
};

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = history.location.search.slice(7);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    const {newPassword} = values;
    const res = await resetPassword(newPassword, token);
    if (res.result) {
      toast.success("Password was changed successfully", {
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
        Reset Password
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
                <InputLabel htmlFor="email">New Password</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  type="password"
                  value={values.newPassword}
                  name="newPassword"
                  onChange={handleChange}
                  labelWidth={110}
                />
              </FormControl>
              <span>{errors.newPassword}</span>
            </div>
            <div className={classes.formRow}>
              <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="email">Confirm Password</InputLabel>
                <OutlinedInput
                  id="passwordAgain"
                  type="password"
                  value={values.passwordAgain}
                  name="passwordAgain"
                  onChange={handleChange}
                  labelWidth={140}
                />
              </FormControl>
              <span>{errors.passwordAgain}</span>
            </div>
            <br/><br/>
            <Button
              fullWidth
              color="primary"
              type="submit"
            >
              Reset Password
            </Button>
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
