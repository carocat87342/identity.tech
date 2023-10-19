import React, { FC, ReactElement } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

// constants
import { FOOTER_HEIGHT } from "../utils/constant";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      background: theme.palette.background.paper,
      minHeight: FOOTER_HEIGHT,
    },
    footer: {
      textTransform: "uppercase",
    },
  })
);

// functional component
const Footer: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href={`${process.env.REACT_APP_API_URL_LOCAL}`} target='_blank' rel="noreferrer" className={classes.footer}>
        @ 2021 - AeroVision.io
      </Link>
    </div>
  );
};

export default Footer;
