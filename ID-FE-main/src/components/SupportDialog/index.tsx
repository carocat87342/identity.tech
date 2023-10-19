import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() =>  ({
  margin: {
    marginBottom: '30px'
  },
  textField: {
    
  }
}))

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      '& h6': {
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white'
      }
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: '10px',
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SupportDialog({open, onClose}) {
  const classes = useStyles()

  const [values, setValues] = React.useState({
    email: '',
    message: '',
  });
  // @ts-ignore
  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title">
        Send us any question or comment and we'll get back to you shortly
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          className={clsx(classes.margin, classes.textField)}
          label="Email"
          variant="outlined"
          value={values.email}
          onChange={handleChange('email')}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Message"
          variant="outlined"
          value={values.message}
          onChange={handleChange('message')}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={onClose} variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
