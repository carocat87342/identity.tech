import {makeStyles} from '@material-ui/core/styles'


export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  content: {
    padding: '20px'
  },
  margin: {
    marginBottom: '20px'
  },
  title: {
    fontSize: '20px'
  },
  subTitle: {
    marginBottom: '10px',
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
  divider: {
    margin: 0
  },
  footer: {
    padding: '20px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
}));