import React from 'react'
import './Navbar.sass'

const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__list-link"><a href="/profile">Профиль</a></li>
                <li className="nav__list-link"><a href="/messages">Сообщения</a></li>
                <li className="nav__list-link"><a href="/news">Новости</a></li>
                <li className="nav__list-link"><a href="/music">Музыка</a></li>
                <li className="nav__list-link"><a href="/settings">Настройки</a></li>
            </ul>
        </nav>
    )
}

export default Navbar