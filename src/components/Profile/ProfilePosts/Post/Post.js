import React from 'react'

const Post = (props) => {
    return (
        <div className="content__profile-post">
            <img src="https://dayzrussia.com/wiki/images/f/f7/Faer_ava.jpg" alt="Аватар"/>
            <h3>{props.text}</h3>
        </div>
    )
}

export default Post