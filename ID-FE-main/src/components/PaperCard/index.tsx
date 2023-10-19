import React, {ReactNode, FC} from 'react'
import { Paper, Divider } from 'components'
import {useStyles} from './styles';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
};

const PaperCard: FC<Props> = ({title, children, className}) => { 
  const classes = useStyles();
  return (
    <Paper className={`${classes.root} ${className || ""}`}>
      <div className={classes.title}>{title}</div>
      <Divider className={classes.divider} />
      <div className="content">
        {children}
      </div>
    </Paper>
  )
};

export default PaperCard
