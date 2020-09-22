import React from 'react'
import Post from './Post/Post'

const ProfilePosts = () => {
    return (
        <>
            <h2>Мои записи</h2>
            <div className="content__profile-add-post">
                <textarea/>
                <button>Добавить</button>
            </div>
            <div className="content__profile-posts">
                <Post/>
                <Post/>
            </div>
        </>
    )
}

export default ProfilePosts