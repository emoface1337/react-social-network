import React, { useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { Grid, CssBaseline, Container } from '@material-ui/core'

import { Header, Login, Home } from './components'
import Loader from './components/Loader/Loader'

import { initializeApp } from './store/actions/appActions'

import './App.module.sass'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

    const initialized = useSelector(state => state.app.initialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

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

export default App
