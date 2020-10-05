import React from 'react'
import Box from '@material-ui/core/Box'

const DialogMessage = (props) => {
    return (
        <Box className="dialogs__message">{props.message.text}</Box>
    )
}

export default DialogMessage