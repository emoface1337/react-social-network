import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import './App.sass'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'


let state = {
    messages: [
        { id: 1, text: 'hi 1' },
        { id: 2, text: 'hi 2' }
    ],
    posts: [
        { id: 1, text: 'post 1' },
        { id: 1, text: 'post 2' }
    ],
    dialogs: [
        { id: 1, name: 'Anya' },
        { id: 2, name: 'Vasya' }
    ]
}

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <section className="content">
                    <Route path='/profile' exact render={() => <Profile posts={state.posts}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs dialogs={state.dialogs} messages={state.messages}/>}/>
                </section>
            </div>
        </BrowserRouter>
    )
}

export default App
