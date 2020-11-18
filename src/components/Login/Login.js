import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm/LoginForm'
import { Typography, Grid } from '@material-ui/core'

import { authActions } from '../../store/actions'

const Login = () => {

    const { isAuth, captchaUrl } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const onLogin = values => {
        dispatch(authActions.login(values.email, values.password, values.rememberMe, values.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>Логин</Typography>
            <LoginForm onSubmit={onLogin} captchaUrl={captchaUrl}/>
        </Grid>
    )
}

export default Login
