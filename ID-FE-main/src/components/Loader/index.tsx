
import {CircularProgress} from 'components'

import useStyles from './styles'

const Loader = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper} data-testid="loader">
      <CircularProgress />
    </div>
  )
}

export default Loader
