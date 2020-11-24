import React from 'react'
import { NavLink } from 'react-router-dom'

import { ListItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    dialogsUserLink: {
        display: 'block',
        textDecoration: 'none',
        color: 'white',
        '&.active': {
            color: 'hotpink'
        }
    }
}))

type Props = {
    dialog: UserDialog
}

const DialogUser: React.FC<Props> = ({ dialog }) => {

    const classes = useStyles()
    const path = '/dialogs/' + dialog.id

    return (
        <ListItem button>
            <NavLink to={path} className={classes.dialogsUserLink} activeClassName={classes.dialogsUserLink}>
                {dialog.name}
            </NavLink>
        </ListItem>
    )
}

export default DialogUser
