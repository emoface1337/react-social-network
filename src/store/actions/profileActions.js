import { types } from '../types'
import { profileAPI } from '../../api/api'

export const profileActions = {
    addPost: (postText) => ({
        type: types.profile.ADD_POST,
        payload: postText
    }),
    getUserProfile: (userId) => dispatch => {
        dispatch(setUserIsLoading())
        profileAPI.getProfile(userId)
            .then(({ data }) => {
                dispatch(setUserProfile(data))
            })
    },
    getUserStatus: (userId) => dispatch => {
        profileAPI.getStatus(userId).then(({ data }) => {
            dispatch(setUserStatus(data))
        })
    },
    updateUserStatus: (newStatus) => dispatch => {
        profileAPI.updateStatus(newStatus).then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(newStatus))
            }
        })
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