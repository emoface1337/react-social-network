import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Box, Input, makeStyles } from '@material-ui/core'
import { updateUserStatus } from '../../../ducks/profile'

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

type Props = {
    status: string | null
    currentUserId: UserIdType | null
    userId: UserIdType | null
}

const ProfileStatus: React.FC<Props> = ({ status, currentUserId, userId }) => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [currentStatus, setCurrentStatus] = useState<string | null>('')

    const activateEditMode = () => {
        setEditMode(true)
    }

    const handleChange = (event: { currentTarget: { value: React.SetStateAction<string | null> } }) => {
        setCurrentStatus(event.currentTarget.value)
    }

    const handleBlur = () => {
        if (status !== currentStatus) {
            currentStatus && dispatch(updateUserStatus(currentStatus))
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
