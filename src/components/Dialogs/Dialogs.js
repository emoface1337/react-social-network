import React from 'react'
import { NavLink } from 'react-router-dom'

import './Dialogs.sass'

const UserDialogLink = props => {
    let path = '/dialogs/' + props.id
    return (
        <NavLink to={path} className="dialogs__user" activeClassName="active">
            Яна
        </NavLink>
    )
}

const UserDialogMessage = props => {
    return (
        <div className="dialogs__message">{props.message}</div>
    )
}

const Dialogs = () => {
    return (
        <div className="content__dialogs">
            <div className="dialogs__users">
                <UserDialogLink id="1"/>
                <UserDialogLink id="2"/>
                <UserDialogLink id="3"/>
            </div>
            <div className="dialogs__messages">
                <UserDialogMessage message="Привет"/>
                <UserDialogMessage message="Андрей?"/>
            </div>
        </div>
    )
}

export default Dialogs