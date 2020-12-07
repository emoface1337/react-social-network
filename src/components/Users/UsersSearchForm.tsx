import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Checkbox, FormControlLabel, FormGroup, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    termInput: {
        flex: '1 1 auto',
        marginRight: '16px'
    }
}))

const validationSchema = yup.object({
    term: yup
        .string(),
    friend: yup
        .boolean()
})

type Props = {
    handleSubmit: (values: { term: string, friend: boolean }) => void
}

const UsersSearchForm: React.FC<Props> = ({ handleSubmit }) => {

    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            term: '',
            friend: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleSubmit(values)
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormGroup row={true}>
                <TextField
                    id="term"
                    name="term"
                    value={formik.values.term}
                    onChange={formik.handleChange}
                    error={formik.touched.term && Boolean(formik.errors.term)}
                    className={classes.termInput}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.friend}
                            onChange={formik.handleChange}
                            name="friend"
                            color="primary"
                        />
                    }
                    label="Только друзья"
                />
                <Button color="primary" variant="contained" type="submit">
                    Найти
                </Button>
            </FormGroup>
        </form>
    )
}

export default UsersSearchForm
