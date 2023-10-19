import {makeStyles} from '@material-ui/core/styles'


export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    fontSize: '20px',
  },
  addUserForm: {
    marginTop: '30px',
    display: 'flex',
    gap: '10px',
    '& > div': {
      marginBottom: '30px',
    },
    '& > button': {
      marginBottom: '30px',
    },
  },
  isAdmin: {
    margin: '0px 20px',
    display: 'flex',
    alignItems: 'center'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& > span': {
      color: 'red',
      position: 'absolute',
      top: '100%',
      fontSize: '12px',
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
}));