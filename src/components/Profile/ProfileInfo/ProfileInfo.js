import React from 'react'
import Loader from '../../../Loader/Loader'

const ProfileInfo = ({ profile }) => {
    if (!profile) {
        return <Loader/>
    }
    return (
        <div className="content__profile">
            <div className="content__profile-avatar">
                <img src={profile.photos.large} alt="Аватар"/>
            </div>
            <div className="content__profile-info">
                <h2>{profile.fullName}</h2>
                <p>{profile.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileInfo