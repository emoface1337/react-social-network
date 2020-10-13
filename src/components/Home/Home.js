import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Dialogs from '../Dialogs/Dialogs'
import Users from '../Users/Users'
import Profile from '../Profile/Profile'

import { Box, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    content: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px'
    }
}))

const Home = () => {

    const classes = useStyles()

    return (
        <>
            <Grid item xs={2}><Navbar/></Grid>
            <Grid item xs={10}>
                <Box component={'section'} className={classes.content}>
                    <Switch>
                        <Route path='/profile/:userId?' component={Profile}/>
                        <Route path='/dialogs' render={() => <Dialogs/>}/>
                        <Route path='/users' render={() => <Users/>}/>
                    </Switch>
                </Box>
            </Grid>
        </>
    )
}

export default Home