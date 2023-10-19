import React, { ReactElement, FC, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SyncIcon from '@material-ui/icons/Sync';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import * as userActions from 'store/user/actions'
import logo1 from 'assets/images/icon-colored.png'
import logo2 from 'assets/images/identify-white.png'

// constants
import { DRAWER_WIDTH } from "../utils/constant";
import { useDispatch } from "store";
import { useHistory } from "react-router";
import SupportDialog from "./SupportDialog";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      '& > img': {
        height: '40px',
      }
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      '& .sync': {
        display: 'flex',
        gap: '20px',
        color: 'white',
        '& button': {
          color: 'white'
        }
      }
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
  })
);

// define interface to represent component props
interface Props {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const Header: FC<Props> = ({
  open,
  handleMenuOpen,
}): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [supportDialog, setSupportDialog] = useState(false);

  const onLogout = () => {
    dispatch(userActions.remove())
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar)}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoContainer}>
            <img src={logo1} alt="id" />
            <img src={logo2} alt="id" style={{height: '30px'}}/>
          </div>
          <div className={classes.title}>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              size="small"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className='sync'>
              <span>Last update: 11 minutes ago</span>
              <Button>
                <SyncIcon style={{marginRight: '10px'}}/> Sync now
              </Button>
            </Typography>
          </div>
          <IconButton  size="small" color="inherit" onClick={()=>setSupportDialog(true)}>
            <ContactSupportIcon />
          </IconButton>
          <IconButton size="small" color="inherit" style={{marginLeft: '30px'}} onClick={onLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SupportDialog open={supportDialog} onClose={() => setSupportDialog(false)}/>
    </>
  );
};

export default Header;
