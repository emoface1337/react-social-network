import { types } from '../types'

export const addPost = postText => ({
    type: types.profile.ADD_POST,
    payload: postText
})

export const setUserProfile = profile => ({
    type: types.profile.SET_USER_PROFILE,
    payload: profile
})