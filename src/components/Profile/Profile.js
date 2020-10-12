import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { getUserProfile } from '../../store/actions/profileActions'

import { withRouter } from 'react-router-dom'

import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

const Profile = (props) => {
    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <ProfilePosts/>
        </>
    )
}

const ProfileContainer = (props) => {

    const { getUserProfile } = props

    const userId = props.match.params.userId

    useEffect(() => {
        getUserProfile(userId)
    }, [getUserProfile, userId])

    return <Profile {...props}/>
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile
})

const mapDispatchToProps = {
    getUserProfile
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)