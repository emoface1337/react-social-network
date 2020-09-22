import React from 'react'

const DialogMessage = (props) => {
    return (
        <div className="dialogs__message">{props.message.text}</div>
    )
}

export default DialogMessage