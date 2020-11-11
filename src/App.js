import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { Grid, CssBaseline, Container } from '@material-ui/core'
import './App.module.sass'

import { Header, Login, Home } from './components'

import { initializeApp } from './store/actions/appActions'
import Loader from './components/Loader/Loader'

const App = ({ initializeApp, initialized }) => {

    useEffect(() => {
        console.log('app effect')
        initializeApp()
    }, [initializeApp])

    if (!initialized)
        return <Loader/>

    return (
        <BrowserRouter>
            <CssBaseline/>
            <Container maxWidth={'md'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Header/></Grid>
                    <Switch>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/' component={Home}/>
                    </Switch>
                </Grid>
            </Container>
        </BrowserRouter>
    )
}

export default connect(state => ({ initialized: state.app.initialized }), { initializeApp })(App)
