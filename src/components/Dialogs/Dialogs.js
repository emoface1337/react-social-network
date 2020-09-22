import React from 'react'

import './Dialogs.sass'
import DialogUser from './DialogUser/DialogUser'
import DialogMessage from './DialogMessage/DialogMessage'

const Dialogs = (props) => {
    return (
        <div className="content__dialogs">
            <div className="dialogs__users">
                {
                    props.dialogs.map(dialog => (
                        <DialogUser key={`${dialog.id}_${dialog.name}`} dialog={dialog}/>
                    ))
                }
            </div>
            <div className="dialogs__messages">
                {
                    props.messages.map(message => (
                        <DialogMessage key={`${message.id}_${message.text}`} message={message}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Dialogs