import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { profileActions } from '../../store/actions'

import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

import Loader from '../Loader/Loader'

const Profile = ({ profile, status, currentUserId, userId }) => {

    return (
        <div style={{ padding: '20px 20px' }}>
            <ProfileInfo profile={profile} status={status} userId={userId} currentUserId={currentUserId}/>
            <ProfilePosts/>
        </div>
    )
}

const ProfileContainer = () => {

    const profileProps = useSelector(state => state.profile)

    const { profile, isLoading } = useSelector(state => state.profile)
    const currentUserId = useSelector(state => state.auth.userId)

    const dispatch = useDispatch()

    let { userId } = useParams()
    let history = useHistory()

    if (!userId) {
        userId = currentUserId
    }

    useLayoutEffect(() => {
        if (!userId) {
            history.push('/login')
        } else {
            dispatch(profileActions.getUserProfile(userId))
            dispatch(profileActions.getUserStatus(userId))
        }
    }, [userId, history, dispatch])

    if (isLoading) return <Loader/>
    return profile && <Profile {...profileProps} userId={userId} currentUserId={currentUserId}/>
}

export default ProfileContainer
