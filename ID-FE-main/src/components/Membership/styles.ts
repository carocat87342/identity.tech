import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: any) =>  ({
  card: {
    borderRadius: '20px',
    '& .content': {
      padding: '30px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    '& .footer': {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 20px',
    }
  },
  paidPeriod: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 600,
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    '& .amount': {
      fontSize: '70px',
      fontWeight: 1000,
      color: theme.palette.warning.main,
      position: 'relative',
    },
    '& .symbol': {
      position: 'absolute',
      right: '100%',
      top: '-10px',
      fontSize: '30px',
      fontWeight: 400
    },
    '& .period': {
      position: 'absolute',
      left: '100%',
      bottom: 0,
      fontSize: '30px',
      fontWeight: 400
    },
    '& .detail': {
      position: 'absolute',
      left: '50%',
      top: '100%',
      transform: 'translateX(-50%)',
      fontSize: '12px',
      color: '#000',
      whiteSpace: 'nowrap',
      fontWeight: 300
    },
  },
  perk: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      color: theme.palette.warning.main
    }
  },
  divider: {
    margin: 0
  },
}));