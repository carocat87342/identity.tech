import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme: any) =>  ({
  description: {
    margin: '0 0 30px',
    color: theme.palette.body,
    fontWeight: 800,
    fontSize: '24px'
  },
  loginButton: {
    background: theme.palette.warning.main,
    borderRadius: '999px',
    width: '130px',
    color: 'white',
    height: '40px'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& > div': {
      marginBottom: '30px',
    },
    '& > span': {
      color: 'red',
      position: 'absolute',
      top: 'calc(100% - 30px)',
      fontSize: '12px',
    }
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
  forgot: {
    display: 'flex',
    justifyContent: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  btnLink: {
    textDecoration: 'none'
  }
}))
