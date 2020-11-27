import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginThunk } from '../../ducks/auth'
import { RootState } from '../../ducks'

import LoginForm from './LoginForm/LoginForm'
import { Grid, Typography } from '@material-ui/core'

const Login = () => {

    const { isAuth, captchaUrl } = useSelector((state:RootState) => state.auth)

    const dispatch = useDispatch()

    const onLogin = (values: { email: string; password: string; rememberMe: boolean; captcha: string | null }) => {
        dispatch(loginThunk(values.email, values.password, values.rememberMe, values.captcha))
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
