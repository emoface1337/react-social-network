import React from 'react'
import './App.sass'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'

function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <section className="content">
                {/*<Dialogs/>*/}
                <Profile/>
            </section>

        </div>
    )
}

export default App
