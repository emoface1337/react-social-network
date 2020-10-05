import React from 'react'

import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    nav: {
        padding: '20px 20px',
        maxHeight: '100px'
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    navListItem: {
        marginBottom: '10px'
    },
    navListItemNavLink: {
        color: 'white',
        textDecoration: 'none',
        '&.active': {
            color: 'hotpink'
        }
    }
}))

const Navbar = () => {

    const classes = useStyles()

    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/profile">Профиль</NavLink></li>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/dialogs">Сообщения</NavLink></li>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/news">Новости</NavLink></li>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/music">Музыка</NavLink></li>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/users">Пользователи</NavLink></li>
                <li className={classes.navListItem}><NavLink className={classes.navListItemNavLink}
                                                             activeClassName="active"
                                                             to="/settings">Настройки</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar