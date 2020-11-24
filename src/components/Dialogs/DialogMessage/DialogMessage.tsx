import React from 'react'
import { ListItem } from '@material-ui/core'

type Props = {
    message: UserMessage
}

const DialogMessage: React.FC<Props> = ({ message }) => {
    return (
        <ListItem button className="dialogs__message">{message.text}</ListItem>
    )
}

export default DialogMessage
