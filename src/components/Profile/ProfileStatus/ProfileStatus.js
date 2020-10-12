import React, { useEffect, useState } from 'react'

const ProfileStatus = props => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
    }

    const handleChange = (event) => {
        setStatus(event.currentTarget.value)
    }

    const handleBlur = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
            {
                editMode ? <input type="text" value={status} autoFocus={true}
                                  onBlur={handleBlur} onChange={handleChange}/> :
                    <span
                        onDoubleClick={activateEditMode}>{status || 'Расскажите что-нибудь'}</span>
            }
        </>
    )
}

export default ProfileStatus