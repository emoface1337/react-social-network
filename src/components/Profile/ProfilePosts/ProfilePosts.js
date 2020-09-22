import React from 'react'
import Post from './Post/Post'

const ProfilePosts = (props) => {

    const newPostTextArea = React.createRef()

    const onAddPost = () => {
        console.log(newPostTextArea.current.value)
    }

    return (
        <>
            <h2>Мои записи</h2>
            <div className="content__profile-add-post">
                <textarea ref={newPostTextArea}/>
                <button onClick={onAddPost}>Добавить</button>
            </div>
            <div className="content__profile-posts">
                {
                    props.posts.map(post => (
                        <Post key={`${post.id}_${post.text}`} text={post.text}/>
                    ))
                }
            </div>
        </>
    )
}

export default ProfilePosts