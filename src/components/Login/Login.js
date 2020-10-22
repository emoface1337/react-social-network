import React from 'react'
import { connect } from 'react-redux'

import LoginForm from './LoginForm/LoginForm'
import { Typography, Grid } from '@material-ui/core'
import { authActions } from '../../store/actions'
import { Redirect } from 'react-router-dom'

const Login = ({ login, isAuth }) => {

    const onLogin = values => {
        login(values.email, values.password, values.rememberMe)
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

export default connect(state => ({ isAuth: state.auth.isAuth }), { login: authActions.login })(Login)
