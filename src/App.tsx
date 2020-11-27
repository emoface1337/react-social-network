import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './ducks'
import { initializeApp } from './ducks/app'

import { Container, CssBaseline, Grid } from '@material-ui/core'

import { Content, Header, Login } from './components'
import Loader from './components/Loader/Loader'

const App = () => {

    const initialized = useSelector((state: RootState) => state.app.initialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initialized)
        return <Loader/>

    return (
        <Router>
            <CssBaseline/>
            <Container maxWidth={'md'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Content}/>
                </Grid>
            </Container>
        </Router>
    )
}

export default App
