import React, { useEffect, useMemo, useRef } from 'react'
import {Container, Grid, Paper, Divider, Button, RadioGroup, Radio, Backdrop, CircularProgress} from 'components'
import {useStyles} from './styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {useDispatch, useSelector} from 'store'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateUser, clearLoading } from 'store/user/actions';

const MyProfile: React.FC = () => { 
  const classes = useStyles();
  const {loading: updating, ...user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const ProfileSchema = useMemo(() => Yup.object().shape({
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
    oldPassword: Yup.string()
      .oneOf([user.password, null], 'Wrong password')
      .optional(),
    newPassword: Yup.string().nullable(),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    activePeople: Yup.boolean().nullable(),
    weeklyReport: Yup.boolean().nullable(),
    sendDay: Yup.string().nullable(),
    utilizationNotifications: Yup.boolean().nullable(),
  }), [user.id]);

  const INITIAL_DATA = useMemo(() => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    oldPassword: '',
    newPassword: '',
    passwordAgain: '',
    activePeople: user.activePeople,
    weeklyReport: !!user.weeklyReport,
    sendDay: user.weeklyReport,
    utilizationNotifications: user.utilizationNotifications,
  }), [user.id]);

  const onSubmit = ({firstName, lastName, email, oldPassword, newPassword, passwordAgain, activePeople, weeklyReport, sendDay, utilizationNotifications}) => {
    let data = {};
    if (firstName !== user.firstName)
      data = {
        ...data,
        firstName
      };
    if (lastName !== user.lastName)
      data = {
        ...data,
        lastName
      };
    if (email !== user.email)
      data = {
        ...data,
        email
      };
    if (oldPassword === user.password) {
      if (newPassword === passwordAgain && newPassword !== '') {
        data = {
          ...data,
          password: newPassword
        };
      }
    }
    if (activePeople !== user.activePeople)
      data = {
        ...data,
        activePeople
      };
    if (weeklyReport !== user.weeklyReport)
      data = {
        ...data,
        weeklyReport: sendDay || null
      };
    if (utilizationNotifications !== user.utilizationNotifications)
      data = {
        ...data,
        utilizationNotifications
      };
    
    dispatch(updateUser(data));
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={INITIAL_DATA}
        validationSchema={ProfileSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={values => {
          onSubmit(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
        }) => (
          <Container navbar component="main" className={classes.root}>
            <p className={classes.title}>My Profile</p>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={8} >
                <Paper className={classes.paper}>
                  <Form autoComplete="off" onSubmit={handleSubmit}>
                    <div className={classes.content}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} >
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="First Name"
                              variant="outlined"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                            />
                            <span>{errors.firstName}</span>
                          </div>
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="Last Name"
                              variant="outlined"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                            />
                            <span>{errors.lastName}</span>
                          </div>
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="Email"
                              variant="outlined"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                            />
                            <span>{errors.email}</span>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="Old Password"
                              variant="outlined"
                              name="oldPassword"
                              value={values.oldPassword}
                              onChange={handleChange}
                            />
                            <span>{errors.oldPassword}</span>
                          </div>
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="New Password"
                              variant="outlined"
                              name="newPassword"
                              value={values.newPassword}
                              onChange={handleChange}
                            />
                            <span>{errors.newPassword}</span>
                          </div>
                          <div className={classes.formRow}>
                            <TextField
                              fullWidth
                              className={classes.margin}
                              label="Password Again"
                              variant="outlined"
                              name="passwordAgain"
                              value={values.passwordAgain}
                              onChange={handleChange}
                            />
                            <span>{errors.passwordAgain}</span>
                          </div>
                        </Grid>
                      </Grid>
                      <Divider className={classes.divider} />
                      <br />
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} className={classes.subTitle}>
                          <div className={classes.subTitle}><strong>Dashboard Settings</strong></div>
                          <FormControlLabel
                            control={<Switch checked={values.activePeople} onChange={(e) => setFieldValue('activePeople', e.target.checked)} name="activePeople" />}
                            label="Active People"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <div className={classes.subTitle}><strong>Weekly report (week starts on Monday)</strong></div>
                          <FormControlLabel
                            className={classes.subTitle}
                            control={<Switch checked={values.weeklyReport} onChange={(e) => setFieldValue('weeklyReport', e.target.checked)} name="activePeople" />}
                            label="Send weekly report"
                          /> <br/>
                          <FormControl component="fieldset" className={classes.subTitle}>
                            <FormLabel component="legend">Send Every</FormLabel>
                            <RadioGroup 
                              row
                              aria-label="sendDay"
                              name="sendDay"
                              value={values.sendDay}
                              onChange={(e) => setFieldValue('sendDay', e.target.value)}
                            >
                              <FormControlLabel value="monday" control={<Radio />} label="Monday" disabled={!values.weeklyReport} />
                              <FormControlLabel value="tuesday" control={<Radio />} label="Tuesday" disabled={!values.weeklyReport} />
                            </RadioGroup>
                          </FormControl> <br/>
                          <Button autoFocus variant="contained" color="primary">
                            GENERATE LAST WEEK'S REPORT NOW
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                          <div className={classes.subTitle}><strong>Over-utilization notifications</strong></div>
                          <FormControlLabel
                            control={<Switch checked={values.utilizationNotifications} onChange={(e) => setFieldValue('utilizationNotifications', e.target.checked)} name="activePeople" />}
                            label="Notify me about over-utilized team members"
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <Divider className={classes.divider} />
                    <div className={classes.footer}>
                      <Button autoFocus variant="contained" color="primary" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </Formik>
      <Backdrop className={classes.backdrop} open={updating}>
        <CircularProgress color="inherit" />
        Updating...
      </Backdrop>
    </>
  )
}

export default MyProfile
