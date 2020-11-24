import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

import Loader from '../Loader/Loader'

import { RootState } from '../../ducks'
import { getUserProfile, getUserStatus } from '../../ducks/profile'
import { GetProfileResponseType } from '../../api/profile'

type ProfileProps = {
    profile: GetProfileResponseType | null
    status: string | null
    currentUserId: UserIdType | null
    userId: UserIdType | null
}

const Profile: React.FC<ProfileProps> = ({ profile, status, currentUserId, userId }) => {

    return (
        <div style={{ padding: '20px 20px' }}>
            <ProfileInfo profile={profile} status={status} userId={userId} currentUserId={currentUserId}/>
            <ProfilePosts/>
        </div>
    )
}

const ProfileContainer = () => {

    const profileProps = useSelector((state: RootState) => state.profile)

    const { profile, isLoading } = profileProps

    const currentUserId = useSelector((state: RootState) => state.auth.userId)

    const dispatch = useDispatch()

    let { userId } = useParams<any>()
    let history = useHistory()

    if (!userId) {
        userId = currentUserId
    }

    useLayoutEffect(() => {
        if (!userId) {
            history.push('/login')
        } else {
            dispatch(getUserProfile(userId))
            dispatch(getUserStatus(userId))
        }
    }, [userId, history, dispatch])

    if (isLoading) return <Loader/>
    return profile && <Profile {...profileProps} userId={userId} currentUserId={currentUserId}/>
}

export default ProfileContainer
