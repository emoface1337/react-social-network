import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import './App.sass'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'


function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <section className="content">
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/dialogs' exact component={Dialogs}/>
                </section>
            </div>
        </BrowserRouter>
    )
}

export default App
