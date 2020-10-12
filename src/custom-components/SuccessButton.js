import { Button, withStyles } from '@material-ui/core'

export const SuccessButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    }
}))(Button)