import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { makeStyles, Grid, Box, CssBaseline, Container } from '@material-ui/core'
import './App.module.sass'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import Users from './components/Users/Users'
import Login from './components/Login/Login'


const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px 20px'
    }
}))

const App = () => {

    const classes = useStyles()

    return (
        <BrowserRouter>
            <CssBaseline/>
            <Container maxWidth={'md'}>
                <Header/>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box component={'section'} className={classes.content}>
                            <Route path='/profile/:userId?' render={() => <Profile/>}/>
                            <Route path='/dialogs' render={() => <Dialogs/>}/>
                            <Route path='/users' render={() => <Users/>}/>
                            <Route path='/login' exact render={() => <Login/>}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </BrowserRouter>
    )
}

export default App
