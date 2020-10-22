import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core'
import { SuccessButton } from '../../../custom-components/SuccessButton'

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
    },
    formError: {
        color: 'red',
        textAlign: 'center'
    }
}))

const validate = values => {
    const errors = {}
    const requiredFields = [
        'email',
        'password'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Обязательное поле'
        }
    })

    return errors
}

const renderTextField = ({ label, input, meta: { touched, invalid, error } }) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        variant="outlined"
        required
    />
)

const renderPasswordField = ({ label, input, meta: { touched, invalid, error } }) =>
    (
        <TextField
            label={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
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
                />
            }
            label={label}
        />
    </div>
)

const LoginForm = props => {

    const { handleSubmit, pristine, submitting, error } = props

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Field name="email" component={renderTextField} label="E-mail"/>
            <Field name="password" component={renderPasswordField} label="Пароль"/>
            <Field name="rememberMe" component={renderCheckbox} label="Запомнить меня"/>
            <SuccessButton type="submit" disabled={pristine || submitting}>
                Войти
            </SuccessButton>
            {
                error && <div className={classes.formError}>{error}</div>
            }
        </form>
    )
}

export default reduxForm({
    form: 'login',
    validate
})(LoginForm)