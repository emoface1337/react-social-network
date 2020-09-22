import React from 'react'

import './Dialogs.sass'

const Dialogs = () => {
    return (
        <div className="content__dialogs">
            <div className="dialogs__users">
                <div className="dialogs__user active">
                    Яна
                </div>
                <div className="dialogs__user">
                    Аня
                </div>
            </div>
            <div className="dialogs__messages">
                <div className="dialogs__message">Сообщение 1</div>
                <div className="dialogs__message">Сообщение 1</div>
                <div className="dialogs__message">Сообщение 1</div>
            </div>
        </div>
    )
}

export default Dialogs