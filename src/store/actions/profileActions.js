import { types } from '../types'

export const addPost = postText => ({
    type: types.profile.ADD_POST,
    payload: postText
})