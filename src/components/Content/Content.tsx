import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Dialogs, Navbar, Profile, Users } from '../'

import { Box, Grid, makeStyles, Theme } from '@material-ui/core'
import { RootState } from '../../ducks'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    content: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px'
    }
}))

const Content = () => {

    const classes = useStyles()

    const { isAuth } = useSelector((state: RootState) => state.auth)

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid item xs={2}><Navbar/></Grid>
            <Grid item xs={10}>
                <Box component={'section'} className={classes.content}>
                    <Switch>
                        <Route path='/profile/:userId?' component={Profile}/>
                        <Route path='/dialogs' component={Dialogs}/>
                        <Route path='/users' component={Users}/>
                        <Redirect from="/" to="/profile" exact/>
                    </Switch>
                </Box>
            </Grid>
        </>
    )
}

export default Content
