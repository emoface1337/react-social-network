import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, List, makeStyles, TextField, Typography } from '@material-ui/core'
import { SuccessButton } from '../../../custom-components/SuccessButton'

import Post from './Post/Post'

import { RootState } from '../../../ducks'
import { addPost } from '../../../ducks/profile'

const useStyles = makeStyles(() => ({
    profileAddPostTextArea: {
        width: '100%',
        margin: '10px 0'
    },
    profilePosts: {}
}))

const ProfilePosts = () => {

    const classes = useStyles()

    const newPostTextArea = React.createRef<HTMLTextAreaElement>()

    const posts = useSelector((state: RootState) => state.profile.posts)

    const dispatch = useDispatch()

    const onAddPost = () => {
        const postText = newPostTextArea.current!.value
        if (postText !== '')
            dispatch(addPost(newPostTextArea.current!.value))
    }

    return (
        <>
            <Typography variant="h5">Мои записи</Typography>
            <TextField
                multiline
                rows={4}
                placeholder="Ваша новость..."
                className={classes.profileAddPostTextArea}
                variant="outlined"
                inputRef={newPostTextArea}
            />
            <Box style={{ textAlign: 'end' }}>
                <SuccessButton onClick={onAddPost} variant="contained">Добавить</SuccessButton>
            </Box>
            <List>
                {
                    posts.map(post => (
                        <Post key={`${post.id}_${post.text}`} text={post.text}/>
                    ))
                }
            </List>
        </>
    )
}

export default ProfilePosts
