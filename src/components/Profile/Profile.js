import React from 'react'
import './Profile.sass'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <>
            <ProfileInfo/>
            <ProfilePosts posts={props.posts}/>
        </>
    )
}

export default Profile