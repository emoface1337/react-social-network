import React from 'react'
import Post from './Post/Post'
import { connect } from 'react-redux'
import { addPost } from '../../../store/actions/profileActions'

const ProfilePosts = (props) => {

    const newPostTextArea = React.createRef()

    const onAddPost = () => {
        props.addPost(newPostTextArea.current.value)
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

const mapStateToProps = state => ({
    posts: state.profileReducer.posts
})

const mapDispatchToProps = dispatch => ({
    addPost: postText => dispatch(addPost(postText))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)