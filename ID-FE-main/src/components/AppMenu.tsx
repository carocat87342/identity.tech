import React, { FC, ReactElement, useState } from "react";
import clsx from 'clsx';
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Icon,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Avatar from '@material-ui/core/Avatar';
import * as userActions from 'store/user/actions'

// components
import MenuItem from "./MenuItem";
// app routes
import routes from "config/routes";
// interfaces
import RouteItem from "model/RouteItem.model";
import { useDispatch, useSelector } from "store";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '15px'
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textDecoration: 'none',
      color: 'black',
      '& .photo': {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: '10px'
      },
      '& .name': {
        fontSize: '20px',
        fontWeight: 'bold'
      }
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    selected: {
      transition: "box-shadow",
      transitionDuration: "1s",
      boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`
    },
  })
);

// functional component
const AppMenu: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = useState([]);
  const firstName = useSelector(state => state.user.firstName);
  const lastName = useSelector(state => state.user.lastName);
  const role = useSelector(state => state.user.role);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userActions.remove())
  };

  const handleClick = (id): void => {
    if (open.indexOf(id) > -1) {
      setOpen([...open.filter(o => o !== id)]);
    } else {
      setOpen([...open, id]);
    }
  };

  const MyInfo = () => {
    return (
      <Link className={clsx({[classes.avatar]: true, [classes.divider]: true})} to="/management/profile">
        <Avatar className='photo'>{firstName && firstName.charAt(0)}{lastName && lastName.charAt(0)}</Avatar>
        <span className='name'>{firstName} {lastName}</span>
        <span className='role'>Account Admin</span>
      </Link>
    );
  };

  if (!firstName) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <MyInfo/>
      <Divider className={classes.divider} />
      <List>
        {routes.map((route: RouteItem) => (
          <> { route.roles.indexOf(role) > -1 && <>
            {route.subRoutes ? (
                <>
                  <ListItem button onClick={() => handleClick(route.menuId)}>
                    <ListItemIcon>
                      <IconButton
                        size='small'
                      >
                        <Icon component={route.icon} />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={route.title} />
                    {open.indexOf(route.menuId) > -1 ? (
                      <Tooltip title="Collapse" placement="bottom">
                        <ExpandLess />
                      </Tooltip>
                    ) : (
                        <Tooltip title="Expand" placement="bottom">
                          <ExpandMore />
                        </Tooltip>
                      )}
                  </ListItem>
                  <Collapse in={open.indexOf(route.menuId) > -1} timeout="auto" unmountOnExit>
                    <List className={classes.nested}>
                      {route.subRoutes.map((sRoute: RouteItem) => (
                        <>
                          { sRoute.roles.indexOf(role) > -1 && 
                            <MenuItem
                              menuId={route.menuId}
                              title={sRoute.title}
                              icon={sRoute.icon}
                              tooltip={sRoute.tooltip}
                              path={sRoute.path}
                              enabled={sRoute.enabled}
                              component={sRoute.component}
                              subRoutes={sRoute.subRoutes}
                            />
                          }
                        </>
                      ))}
                    </List>
                  </Collapse>
              </>
            ) : (
              <MenuItem
                menuId={route.menuId}
                title={route.title}
                icon={route.icon}
                tooltip={route.tooltip}
                path={route.path}
                enabled={route.enabled}
                component={route.component}
                subRoutes={route.subRoutes}
                onClick={() => {
                  if (route.menuId==='router-logout') {
                    onLogout();
                  }
                }}
              />
            )}
            </>}
            {route.appendDivider && <Divider className={classes.divider} />}
          </>
        ))}
      </List >
    </div>
  );
};

export default AppMenu;
