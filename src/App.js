import React from 'react'
import './App.sass'

function App() {
    return (
        <div className="app-wrapper">
            <header className="header">
                <img className="header__logo"
                     src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-563cf163-2aac-41ac-be0c-7a010a141f38-UqPnD.png"
                     alt="Logo"/>
            </header>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__list-link"><a href="/profile">Профиль</a></li>
                    <li className="nav__list-link"><a href="/messages">Сообщения</a></li>
                    <li className="nav__list-link"><a href="/news">Новости</a></li>
                    <li className="nav__list-link"><a href="/music">Музыка</a></li>
                    <li className="nav__list-link"><a href="/settings">Настройки</a></li>
                </ul>
            </nav>
            <section className="content">
                <div className="content__profile">
                    <div className="content__profile-image">
                        <img src="https://dayzrussia.com/wiki/images/f/f7/Faer_ava.jpg" alt="Аватар"/>
                    </div>
                    <div className="content__profile-info">
                        <h2>Никита Б.</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                    </div>
                </div>
                <h2>Мои записи</h2>
                <div className="content__profile-add-post">
                    Новая запись
                </div>
                <div className="content__profile-posts">
                    <h3>Пост 1</h3>
                    <h3>Пост 2</h3>
                </div>
            </section>
        </div>
    )
}

export default App
