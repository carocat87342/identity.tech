import React from 'react'
import classnames from 'classnames'
import {Container} from '@material-ui/core'
import {ContainerProps} from '@material-ui/core/Container'

import useStyles from './styles'

type Props = {
  maxWidth?: string
  navbar?: boolean
  padded?: boolean
  component?: string;
} & ContainerProps

const WrappedContainer: React.FC<Props> = ({children, navbar, padded = true, className='', maxWidth = 'xl',  component = 'main', ...rest}: Props) => {
  const {horPadding, navbarMargin} = useStyles()

  return (
    // @ts-ignore
    <Container {...rest} className={classnames({
        [horPadding]: padded,
        [navbarMargin]: navbar,
      }) + ' ' + className} maxWidth={maxWidth}
    >
      {children}
    </Container>
  )
}

export default WrappedContainer
