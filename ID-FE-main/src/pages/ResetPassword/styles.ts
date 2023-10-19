import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme: any) =>  ({
  description: {
      margin: '0 0 30px',
      color: theme.palette.body,
      fontWeight: 800,
      fontSize: '24px'
    },
  margin: {
    marginBottom: '30px'
  },
  textField: {
    
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
}))
