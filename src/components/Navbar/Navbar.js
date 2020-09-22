import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.sass'

const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__list-link"><NavLink activeClassName="active" to="/profile">Профиль</NavLink></li>
                <li className="nav__list-link"><NavLink activeClassName="active" to="/dialogs">Сообщения</NavLink></li>
                <li className="nav__list-link"><NavLink activeClassName="active" to="/news">Новости</NavLink></li>
                <li className="nav__list-link"><NavLink activeClassName="active" to="/music">Музыка</NavLink></li>
                <li className="nav__list-link"><NavLink activeClassName="active" to="/settings">Настройки</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar