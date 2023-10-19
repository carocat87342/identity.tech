import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme: any) => ({
  layout: {
    minHeight: '100vh'
  },
  signInWrapper: {
    display: 'flex',
    margin: 'auto',
    marginTop: theme.spacing(8),
    color: theme.palette.primary.main,
    maxWidth: '1180px',
    width: '90%'
  },
  signInAvatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  signInForm: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  signInSubmit: {
    textDecoration: 'none'
  },
  leftPanel: {
    width: '50%',
    height: '670px',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    background: theme.palette.primary.main,
    padding: '60px 50px 60px 30px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& > img': {
      marginTop: '50px',
      marginBottom: '50px'
    }
  },
  rightPanel: {
    width: '50%',
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
    background: theme.palette.white,
    padding: '60px',
    '& > .description': {
      margin: '0 0 30px',
      color: theme.palette.body,
      fontWeight: 800,
      fontSize: '24px'
    }
  },
  top: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loginButton: {
    background: theme.palette.warning.main,
    borderRadius: '999px',
    width: '130px',
    color: 'white',
    height: '40px'
  },
  note: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: '20px',
    width: '300px',
    textAlignLast: 'center'
  },
  margin: {
    marginBottom: '30px'
  },
  textField: {
    
  }
}))
