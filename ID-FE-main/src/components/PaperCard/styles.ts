import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginBottom: '40px',
    '& > .content': {
      padding: '20px'
    }
  },
  title: {
    padding: '20px',
    fontSize: '20px',
    fontWeight: 400
  },
  divider: {
    margin: 0
  }
}));