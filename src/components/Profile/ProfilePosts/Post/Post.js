import React from 'react'

import {Divider, Avatar, ListItemText, ListItemAvatar, ListItem} from '@material-ui/core'

const Post = (props) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://dayzrussia.com/wiki/images/f/f7/Faer_ava.jpg"/>
                </ListItemAvatar>
                <ListItemText primary={props.text}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    )
}

export default Post