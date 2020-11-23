import { profileAPI } from '../../api/api'
import {
    PROFILE_ADD_POST,
    PROFILE_SET_USER_IS_LOADING, PROFILE_SET_USER_PHOTO,
    PROFILE_SET_USER_PROFILE,
    PROFILE_SET_USER_STATUS, profileActionTypes
} from '../types'
import { dispatchType } from '../store'

export const profileActions = {
    addPost: (postText: string): profileActionTypes => ({
        type: PROFILE_ADD_POST,
        payload: postText
    }),

    getUserProfile: (userId: number | string) => async (dispatch: dispatchType) => {
        dispatch(setUserIsLoading())
        const { data } = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    },

    getUserStatus: (userId: number | string) => async (dispatch: dispatchType) => {
        const { data } = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
    },

    updateUserStatus: (newStatus: string) => async (dispatch: dispatchType) => {
        const { data } = await profileAPI.updateStatus(newStatus)
        if (data.resultCode === 0) {
            dispatch(setUserStatus(newStatus))
        }
    },

    updateUserPhoto: (photo: any) => async (dispatch: dispatchType) => {
        const { data } = await profileAPI.updateUserPhoto(photo)
        if (data.resultCode === 0) {
            dispatch(setUserPhoto(data.data.photos))
        }
    }
}

const setUserProfile = (profile: any): profileActionTypes => ({
    type: PROFILE_SET_USER_PROFILE,
    payload: profile
})

const setUserStatus = (status: string): profileActionTypes => ({
    type: PROFILE_SET_USER_STATUS,
    payload: status
})

const setUserIsLoading = (): profileActionTypes => ({
    type: PROFILE_SET_USER_IS_LOADING
})

const setUserPhoto = (photos: any): profileActionTypes => ({
    type: PROFILE_SET_USER_PHOTO,
    payload: photos
})
