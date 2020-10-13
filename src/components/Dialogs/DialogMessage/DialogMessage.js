import React from 'react'
import { ListItem } from '@material-ui/core'

const DialogMessage = (props) => {
    return (
        <ListItem button className="dialogs__message">{props.message.text}</ListItem>
    )
}

export default DialogMessage