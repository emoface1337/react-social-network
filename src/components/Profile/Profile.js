import React, { useEffect } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { setUserProfile } from '../../store/actions/profileActions'

import { withRouter } from 'react-router-dom'

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

    const { setUserProfile } = props

    const userId = props.match.params.userId

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(({ data }) => setUserProfile(data))
    }, [setUserProfile, userId])

    return <Profile {...props}/>
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile
})

const mapDispatchToProps = {
    setUserProfile
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer))