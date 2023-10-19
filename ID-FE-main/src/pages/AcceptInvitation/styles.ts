import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme: any) =>  ({
  description: {
      margin: '0 0 30px',
      color: theme.palette.body,
      fontWeight: 800,
      fontSize: '24px'
  },
  congrat: {
    fontSize: '15px',
    color: 'black'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
}))
