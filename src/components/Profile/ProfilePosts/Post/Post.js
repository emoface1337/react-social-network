import React from 'react'

import { Divider, Avatar, ListItemText, ListItemAvatar, ListItem } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person'

const Post = (props) => {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.text} secondary={null}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    )
}

export default Post
