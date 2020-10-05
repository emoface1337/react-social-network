import React from 'react'
import Post from './Post/Post'

import { connect } from 'react-redux'
import { addPost } from '../../../store/actions/profileActions'

import { Box, Typography, makeStyles, TextareaAutosize, List} from '@material-ui/core'

import { SuccessButton } from '../../Custom/SuccessButton'

const useStyles = makeStyles(theme => ({
    profileAddPostTextArea: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        border: '1px solid white',
        borderRadius: '5px',
        padding: '5px 5px'
    },
    profilePosts: {}
}))

const ProfilePosts = (props) => {

    const classes = useStyles()

    const newPostTextArea = React.createRef()

    const onAddPost = () => {
        props.addPost(newPostTextArea.current.value)
    }

    return (
        <>
            <Typography variant="h5">Мои записи</Typography>
            <TextareaAutosize rowsMin={4} placeholder="Ваша новость..." ref={newPostTextArea}
                              className={classes.profileAddPostTextArea}/>
            <Box style={{ textAlign: 'end' }}>
                <SuccessButton onClick={onAddPost} variant="contained">Добавить</SuccessButton>
            </Box>
            <List>
                {
                    props.posts.map(post => (
                        <Post key={`${post.id}_${post.text}`} text={post.text}/>
                    ))
                }
            </List>
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