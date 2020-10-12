import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { getUserProfile, getUserStatus, updateUserStatus } from '../../store/actions/profileActions'

import { withRouter } from 'react-router-dom'

import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import Loader from '../Loader/Loader'

const Profile = (props) => {

    return (
        <>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <ProfilePosts/>
        </>
    )
}

const ProfileContainer = (props) => {

    const { getUserProfile, currentUserId, isLoading, getUserStatus, profile } = props

    let userId = props.match.params.userId

    if (!userId) {
        userId = currentUserId
    }

    useEffect(() => {
        getUserProfile(userId)
        getUserStatus(userId)
    }, [getUserProfile, getUserStatus, userId])

    if (isLoading) return <Loader/>
    return profile && <Profile {...props}/>
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile,
    currentUserId: state.authReducer.userId,
    status: state.profileReducer.status,
    isLoading: state.profileReducer.isLoading
})

const mapDispatchToProps = {
    getUserProfile,
    updateUserStatus,
    getUserStatus
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)