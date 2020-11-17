import { types } from '../types'
import { profileAPI } from '../../api/api'

export const profileActions = {

    addPost: postText => ({
        type: types.profile.ADD_POST,
        payload: postText
    }),

    getUserProfile: userId => async dispatch => {
        dispatch(setUserIsLoading())
        const { data } = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    },

    getUserStatus: userId => async dispatch => {
        const { data } = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
    },

    updateUserStatus: newStatus => async dispatch => {
        const { data } = await profileAPI.updateStatus(newStatus)
        if (data.resultCode === 0) {
            dispatch(setUserStatus(newStatus))
        }
    }
}

const setUserProfile = profile => ({
    type: types.profile.SET_USER_PROFILE,
    payload: profile
})

const setUserStatus = status => ({
    type: types.profile.SET_USER_STATUS,
    payload: status
})

const setUserIsLoading = () => ({
    type: types.profile.SET_USER_IS_LOADING
})
