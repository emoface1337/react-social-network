import React from 'react'
import { Field, FormErrors, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form'

import { Box, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core'
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

const validate = (values: FormValuesProps): FormErrors<FormValuesProps> => {
    const errors: FormErrors<FormValuesProps> = {}

    if (!values.email) {
        errors.email = 'Обязательное поле'
    }

    if (!values.password) {
        errors.password = 'Обязательное поле'
    }

    if (!values.captcha) {
        errors.captcha = 'Обязательное поле'
    }

    return errors
}


const renderTextField: React.FC<WrappedFieldProps & { label: string }> = ({ label, input, meta: { touched, invalid, error } }) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        variant="outlined"
        required
    />
)

const renderPasswordField: React.FC<WrappedFieldProps & { label: string }> = ({ label, input, meta: { touched, invalid, error } }) =>
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

const renderCheckbox: React.FC<WrappedFieldProps & { label: string }> = ({ input, label }) => (
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

type FormValuesProps = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormValuesProps, LoginFormProps> & LoginFormProps> = (props) => {

    const { handleSubmit, pristine, submitting, error, captchaUrl } = props

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Field name="email" component={renderTextField} label="E-mail"/>
            <Field name="password" component={renderPasswordField} label="Пароль"/>
            <Field name="rememberMe" component={renderCheckbox} label="Запомнить меня"/>
            {
                captchaUrl && <Box>
                    <img src={captchaUrl} alt="Captcha"/>
                    <Field name="captcha" component={renderTextField} label="Captcha"/>
                </Box>
            }
            <SuccessButton type="submit" disabled={pristine || submitting}>
                Войти
            </SuccessButton>
            {
                error && <div className={classes.formError}>{error}</div>
            }
        </form>
    )
}

export default reduxForm<FormValuesProps, LoginFormProps>({
    form: 'login',
    validate
})(LoginForm)
