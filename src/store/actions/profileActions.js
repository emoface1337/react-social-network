import { types } from '../types'
import { profileAPI } from '../../api/api'

export const addPost = postText => ({
    type: types.profile.ADD_POST,
    payload: postText
})

const setUserProfile = profile => ({
    type: types.profile.SET_USER_PROFILE,
    payload: profile
})

export const getUserProfile = userId => dispatch => {
    profileAPI.getUserProfile(userId)
        .then(({ data }) => dispatch(setUserProfile(data)))
}