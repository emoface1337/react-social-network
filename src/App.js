import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { Grid,CssBaseline, Container } from '@material-ui/core'
import './App.module.sass'

import { Header, Login, Home } from './components'

const App = () => {

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
