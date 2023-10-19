import React from 'react'

import {Button as MuiButton, ButtonTypeMap} from 'components'

import useStyles from './styles'
import { CommonProps } from '@material-ui/core/OverridableComponent';

interface Props extends CommonProps<ButtonTypeMap> {
  fullWidth?: boolean;
  type?: string;
  width?: string;
  color?: string;
  onClick?: any;
}

const Button: React.FC<Props>  = ({children, ...props}) => {
  const classes = useStyles(props)

  return (
    // @ts-ignore
    <MuiButton className={classes.wrapper} {...props}>
        {children}
    </MuiButton>
  )
};

export default Button
