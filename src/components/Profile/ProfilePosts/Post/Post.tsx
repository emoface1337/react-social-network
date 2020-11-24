import React from 'react'

import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person'

type Props = {
    text: string
}

const Post: React.FC<Props> = (props) => {
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
