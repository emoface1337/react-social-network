import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles, Input, Box } from '@material-ui/core'

import { profileActions } from '../../../store/actions'

const useStyles = makeStyles(theme => ({
    statusTextWrapper: {
        marginRight: '-5px'
    },
    statusText: {
        padding: '5px 0',
        width: '100%',
        background: theme.palette.background.paper,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#323232',
            padding: '5px 5px 5px 5px',
            margin: '0 -5px 0 -5px'
        }
    },
    statusInput: {
        width: '100%'
    }
}))

const ProfileStatus = ({ status, currentUserId, userId }) => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [currentStatus, setCurrentStatus] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
    }

    const handleChange = event => {
        setCurrentStatus(event.currentTarget.value)
    }

    const handleBlur = () => {
        if (status !== currentStatus) {
            dispatch(profileActions.updateUserStatus(currentStatus))
        }
        setEditMode(false)
    }

    useEffect(() => {
        setCurrentStatus(status)
    }, [status])

    if (currentUserId === userId) {
        return (
            editMode
                ?
                <Input defaultValue={currentStatus} autoFocus={true} onBlur={handleBlur} onChange={handleChange}
                       className={classes.statusInput}/>
                : <Box className={classes.statusTextWrapper}>
                    <Box onClick={activateEditMode}
                         className={classes.statusText}>{currentStatus || 'Расскажите что-нибудь'}</Box>
                </Box>
        )
    }

    return (
        <span>{currentStatus || 'Пользователь не установил статус'}</span>
    )
}

export default ProfileStatus
