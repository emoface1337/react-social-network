import React from 'react'
import './Profile.sass'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
    return (
        <>
            <ProfileInfo/>
            <ProfilePosts/>
        </>
    )
}

export default Profile