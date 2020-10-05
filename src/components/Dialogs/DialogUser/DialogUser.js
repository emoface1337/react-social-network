import React from 'react'
import { NavLink } from 'react-router-dom'

import { makeStyles, ListItem } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    dialogsUserLink: {
        marginBottom: '10px',
        display: 'block',
        textDecoration: 'none',
        color: 'white',
        '&.active': {
            color: 'hotpink'
        }
    }
}))

const DialogUser = (props) => {

    const classes = useStyles()
    const path = '/dialogs/' + props.dialog.id

    return (
        <ListItem
            button
        >
            <NavLink to={path} className={classes.dialogsUserLink} activeClassName={classes.dialogsUserLink}>
                {props.dialog.name}
            </NavLink>
        </ListItem>
    )
}

export default DialogUser