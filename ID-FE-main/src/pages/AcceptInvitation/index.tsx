import {useState} from 'react'

import {Backdrop, CircularProgress} from 'components';
import Button from 'components/Button';
import useStyles from './styles'
import {useHistory} from 'react-router';
import * as authActions from 'store/auth/actions'
import { acceptInvitation } from 'api/entries';
import { toast } from 'react-toastify';

const AcceptInvitation = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = history.location.search.slice(7);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const res = await acceptInvitation(token);
    if (res.result) {
      toast.success("Invitation was accepted successfully", {
        position: 'bottom-right',
        theme: 'light'
      });
      history.push('/sign-in');
    } else {
      toast.error(res.error, {
        position: 'bottom-right',
        theme: 'light'
      });
    }
    setLoading(false);
  }

  return (
    <>
      <p className='description'>
        Accept Invitation
      </p>
      <div className={classes.congrat}>
        Congrats! You're invited, please accept to use iDENTIFY
      </div>
      <br/><br/>
      <Button
        fullWidth
        color="primary"
        type="submit"
        onClick={onSubmit}
      >
        Accept
      </Button>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        Wait for a second
      </Backdrop>
    </>
  )
}

export default AcceptInvitation
