import React, { ReactNode, useEffect, useState } from 'react'
import {Collapse, Container, Grid, Checkbox, Button, IconButton, Backdrop, CircularProgress} from 'components'
import {useStyles} from './styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector} from 'store'
import PaperCard from 'components/PaperCard';
import EnhancedTable from 'components/Table';
import InfoIcon from '@material-ui/icons/Info';
import ReactTooltip from 'react-tooltip';
import Membership from 'components/Membership';
import TableCell from '@material-ui/core/TableCell';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { addEmployee, deleteEmployee, getEmployees, sendInvitation, updateRole } from 'store/user/actions';
import ConfirmModal from 'components/Modal';

interface Column {
  id: 'firstName' | 'lastName' | 'email' | 'role' | 'emailVerified';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  render?: (item: any, record: any, column: Column) => ReactNode;
};

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
    .matches(/iDENTIFY.tech$/i, 'Use Email from iDENTIFY.tech')
    .required('Required'),
  isAdmin: Yup.boolean()
    .nullable()
});

const INITIAL_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  isAdmin: false,
};

const AccountPage: React.FC = () => { 
  const classes = useStyles();
  const [showMembership, setShowMembership] = useState(false);
  const user = useSelector(state => state.user);
  const email = user.email;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(user.employees);
  }, [user.employees]);

  const switchRole = (userId: number, role: string) => {
    employees.filter((em) => em.id === userId)[0].role = (role === 'admin' ? 'employee' : 'admin');
    setEmployees(JSON.parse(JSON.stringify(employees)));
  };

  const columns: Column[] = [
    { 
      id: 'firstName',
      label: 'First Name',
      minWidth: 150
    },
    { id: 'lastName', label: 'Last Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'role',
      label: 'Admin',
      minWidth: 150,
      align: 'left',
      render: (item, record, column) => (
        <TableCell key={record.id} align={column.align} role="checkbox">
          <Checkbox
            checked={item === "admin"}
            onChange={() => switchRole(record.id, item)}
            name="isAdmin"
            color="primary"
            disabled={user.id === record.id}
          />
        </TableCell>
      )
    },
    { 
      id: 'emailVerified',
      label: '',
      minWidth: 150,
      align: 'right',
      render: (item, record, column) => (
        <TableCell key={record.id} align={column.align} role="checkbox">
          {record.id !== user.id && <>
            <IconButton
              data-tip=""
              data-for='inviteTooltip'
              onClick={() => dispatch(item 
                ? updateRole({ employeeId: `${record.id}`, role: record.role }) 
                : sendInvitation(record.email))}
            >
              <SendIcon />
            </IconButton>
            <IconButton onClick={() => {setOpen(true); setSelectedUser(record);}}>
              <DeleteIcon />
            </IconButton>
          </>}
          <ReactTooltip
            id='inviteTooltip'
            place="top"
            effect="solid"
            type="info"
            backgroundColor="black"
            multiline
          >
            {item ? 'Update role?' : 'This user didn\'t accept your invitation yet, resend invitation?'}
          </ReactTooltip>
        </TableCell>
      )
    },
  ];


  const onAddEmployee = (data) => {
    const {email, firstName, lastName} = data;
    dispatch(addEmployee({email, firstName, lastName}));
  };

  useEffect(() => {
    if (email) {
      dispatch(getEmployees());
    }
  }, [email]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={INITIAL_DATA}
        validationSchema={Schema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={values => {
          onAddEmployee(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Container navbar component="main" className={classes.root}>
              <p className={classes.title}>Account Management</p>

              <Collapse in={showMembership} collapsedSize={246}>
                <PaperCard title="Membership">
                  { !showMembership && <>
                    <div>Current plan: <strong>Plus - Monthly</strong></div>
                    <div>Your plan supports up to 3 custom categories and up to 50 active time-tracking users. All time entries for users that exceed the cap will not be identified.</div>
                    <br/>
                    <Button autoFocus variant="contained" color="primary" onClick={() => setShowMembership(!showMembership)}>
                      CHANGE PLAN
                    </Button>
                  </>}
                  { showMembership && <>
                    <Membership /> <br/><br/>
                    <Button autoFocus variant="contained" color="default" onClick={() => setShowMembership(!showMembership)}>
                      BACK TO MY PLAN DESCRIPTION
                    </Button>
                  </>}
                </PaperCard>
              </Collapse>

              <PaperCard title="iDENTIFY Users">
                <EnhancedTable columns={columns} rows={email ? [user, ...(employees || [])] : []} />
                <Grid className={classes.addUserForm} item spacing={3} alignItems='center'>
                  <div className={classes.formRow}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      value={values.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                    <span>{errors.firstName}</span>
                  </div>
                  <div className={classes.formRow}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      value={values.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                    <span>{errors.lastName}</span>
                  </div>
                  <div className={classes.formRow}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                    />
                    <span>{errors.email}</span>
                  </div>
                  <div className={classes.isAdmin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.isAdmin}
                          onChange={handleChange}
                          name="isAdmin"
                          color="primary"
                        />
                      }
                      label="Admin"
                    />
                    <InfoIcon data-tip="" data-for="adminTooltip" />
                    <ReactTooltip
                      id='adminTooltip'
                      place="bottom"
                      effect="solid"
                      type="info"
                      backgroundColor="black"
                      multiline
                    >
                      Admins can set custom categories, and have access to the <br/>
                      People, Clients, and Admin Management Pages
                    </ReactTooltip>
                  </div>
                  <Button autoFocus variant="contained" color="primary" type="submit">
                    SEND INVITE
                  </Button>
                </Grid>
              </PaperCard>

              <PaperCard title="Close account">
                Don't need your iDENTIFY account anymore? Click <a href="#" onClick={() => alert('Delete Account?')}>here</a> to ask us to delete it.
              </PaperCard>
            </Container>
          </Form>
        )}
      </Formik>
      <Backdrop className={classes.backdrop} open={user.loading}>
        <CircularProgress color="inherit" />
        Loading...
      </Backdrop>
      <ConfirmModal
        open={open}
        title="Alert"
        body="Would you like to delete this employee?"
        handleClose={() => setOpen(!open)}
        handleOk={() => {
          setOpen(false);
          dispatch(deleteEmployee(selectedUser.id));
        }}
      />
    </>
  )
}

export default AccountPage
