import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { SuccessButton } from '../../custom-components/SuccessButton'
import { makeStyles, Typography, Grid, FormControlLabel, Checkbox, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: '50%'
        }
    }
}))

const validate = values => {
    const errors = {}
    const requiredFields = [
        'login',
        'password',
        'remember'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Обязательное'
        }
    })

    return errors
}

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) =>
    (
        <TextField
            label={label}
            placeholder={label}
            // error={touched && invalid}
            // helperText={touched && error}
            {...input}
            {...custom}
            variant="outlined"
            required
        />
    )

const renderPasswordField = ({ label, input, meta: { touched, invalid, error }, ...custom }) =>
    (
        <TextField
            label={label}
            placeholder={label}
            // error={touched && invalid}
            // helperText={touched && error}
            {...input}
            {...custom}
            variant="outlined"
            type="password"
            required
        />
    )

const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={!!input.value}
                    onChange={input.onChange}
                    required
                />
            }
            label={label}
        />
    </div>
)

const LoginForm = props => {

    const { handleSubmit, pristine, submitting } = props

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Field name="login" component={renderTextField} label="Логин"/>
            <Field name="password" component={renderPasswordField} label="Пароль"/>
            <Field name="remember" component={renderCheckbox} label="Запомнить меня"/>
            <SuccessButton type="submit" disabled={pristine || submitting}>
                Войти
            </SuccessButton>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
    validate
})(LoginForm)

const Login = () => {

    const showResult = values => {
        console.log(values)
    }

    return (
        <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>Логин</Typography>
            <LoginReduxForm onSubmit={showResult}/>
        </Grid>
    )
}

export default Login
