import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
  title: {
    fontSize: '20px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
}))
