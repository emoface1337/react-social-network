import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { profileActions } from '../../../store/actions'

const ProfileStatus = ({ status, currentUserId, userId }) => {

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
                <input type="text" value={currentStatus} autoFocus={true} onBlur={handleBlur} onChange={handleChange}/>
                : <span onDoubleClick={activateEditMode}>{currentStatus || 'Расскажите что-нибудь'}</span>
        )
    }

    return (
        <span>{currentStatus || 'Пользователь не установил статус'}</span>
    )
}

export default ProfileStatus
