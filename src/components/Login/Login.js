import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm/LoginForm'
import { Typography, Grid } from '@material-ui/core'

import { authActions } from '../../store/actions'

const Login = () => {

    const isAuth = useSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onLogin = values => {
        dispatch(authActions.login(values.email, values.password, values.rememberMe))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>Логин</Typography>
            <LoginForm onSubmit={onLogin}/>
        </Grid>
    )
}

export default Login
