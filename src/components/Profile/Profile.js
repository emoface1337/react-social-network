import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { getUserProfile } from '../../store/actions/profileActions'

import { Redirect, withRouter } from 'react-router-dom'

import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <ProfilePosts/>
        </>
    )
}

const ProfileContainer = (props) => {

    const { getUserProfile, isAuth } = props

    const userId = props.match.params.userId

    useEffect(() => {
        getUserProfile(userId)
    }, [getUserProfile, userId])

    if (!isAuth) return <Redirect to='/login'/>

    return <Profile {...props}/>
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile,
    isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = {
    getUserProfile
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer))