import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme: any) =>  ({
  wrapper: {
    borderRadius: '999px',
    backgroundColor: (props: any) => props.color ? theme.palette[props.color].main : 'primary',
    width: (props: any) => props.fullWidth ? '100%' : props.width || '130px',
    color: 'white',
    height: '40px',
    '&.MuiButton-root:hover': {
        opacity: 0.5,
        backgroundColor: (props: any) => props.color ? theme.palette[props.color].main : 'primary',
    }
  }
}))
