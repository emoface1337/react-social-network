import React from 'react'
import './Profile.sass'
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
    return (
        <>
            <div className="content__profile">
                <div className="content__profile-image">
                    <img src="https://dayzrussia.com/wiki/images/f/f7/Faer_ava.jpg" alt="Аватар"/>
                </div>
                <div className="content__profile-info">
                    <h2>Никита Б.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.</p>
                </div>
            </div>
            <MyPosts/>
        </>
    )
}

export default Profile