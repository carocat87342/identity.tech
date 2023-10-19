import {Collapse, Container, Grid, Button, Paper, Divider} from 'components'
import { useStyles } from './styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { values } from 'lodash';
import { useState } from 'react';

const membershipPlans = [
  {
    title: 'Starter',
    period: 'monthly',
    price: 38,
    detail: '*paid monthly, plus applicable VAT',
    accounts: 20
  },
  {
    title: 'Starter',
    period: 'quarterly',
    price: 29,
    detail: '*paid monthly, plus applicable VAT',
    accounts: 20
  },
  {
    title: 'Starter',
    period: 'annually',
    price: 19,
    detail: '*paid monthly, plus applicable VAT',
    accounts: 20
  },
  {
    title: 'Plus',
    price: 98,
    period: 'monthly',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 50,
  },
  {
    title: 'Plus',
    price: 74,
    period: 'quarterly',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 50,
  },
  {
    title: 'Plus',
    price: 49,
    period: 'annually',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 50,
  },
  {
    title: 'Premium',
    price: 198,
    period: 'monthly',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 500,
  },
  {
    title: 'Premium',
    price: 149,
    period: 'quarterly',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 500,
  },
  {
    title: 'Premium',
    price: 99,
    period: 'annually',
    detail: '*paid monthly, plus applicable VAT',
    accounts: 500,
  }
]

const Membership = () => {
  const classes = useStyles();
  const [period, setPeriod] = useState('monthly');
  const [plan, setPlan] = useState(-1);

  return (<>
    <div className={classes.paidPeriod}>
      <ToggleButtonGroup
        size="small"
        value={period}
        exclusive
        onChange={(e, v) => {
          e.preventDefault();
          if (v) {
            setPeriod(v);
            setPlan(-1);
          }
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="annually" aria-label="left aligned">
          PAID ANNUALLY
        </ToggleButton>
        <ToggleButton value="quarterly" aria-label="centered">
          PAID QUARTERLY
        </ToggleButton>
        <ToggleButton value="monthly" aria-label="right aligned">
          PAID MONTHLY
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
    <Grid container spacing={3}>
      {membershipPlans.filter(item => item.period === period).map((item, index) => <>
        <Grid item xs={12} sm={4} key={`plancard-${index}`}>
          <Paper elevation={4} className={classes.card}>
            <div className='content'>
              <div className={classes.title}>{item.title}</div>
              <div className={classes.price}>
                <span className='amount'>
                  {item.price}
                  <span className='symbol'>$</span>
                  <span className='period'>/mo</span>
                  <span className='detail'>
                    {item.detail}
                  </span>
                </span>
              </div>
              <div className={classes.perk}>
                <PeopleAltIcon />
                <span>Up to {item.accounts} active Harvest accounts</span>
              </div>
              <Button variant="contained" color="secondary" onClick={() => setPlan(index)}>
                CHOOSE PLAN
              </Button>
            </div>
            { index === plan && <>
              <Divider className={classes.divider} />
              <div className='footer'>
                <Button color="primary" onClick={() => setPlan(-1)}>
                  CANCEL PLAN
                </Button>
              </div>
            </>}
          </Paper>
        </Grid>
      </>)}
    </Grid>
  </>)
};

export default Membership;