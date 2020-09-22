import React from 'react'
import { NavLink } from 'react-router-dom'

const DialogUser = (props) => {
    let path = '/dialogs/' + props.dialog.id
    return (
        <NavLink to={path} className="dialogs__user" activeClassName="active">
            {props.dialog.name}
        </NavLink>
    )
}

export default DialogUser