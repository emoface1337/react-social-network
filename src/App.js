import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import Users from './components/Users/Users'

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
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={2}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box component={'section'} className={classes.content}>
                            <Route path='/profile/:userId' render={() => <Profile/>}/>
                            <Route path='/dialogs' render={() => <Dialogs/>}/>
                            <Route path='/users' render={() => <Users/>}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </BrowserRouter>
    )
}

export default App
