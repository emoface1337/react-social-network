import { Dispatch } from 'redux'
import { ResultCodeEnums } from '../api/api'
import { getProfile, GetProfileResponseType, getStatus, PhotoType, updateStatus, updateUserPhoto } from '../api/profile'
import { InferActionsTypes } from './index'

export const profileActions = {

    setUserProfile: (profile: GetProfileResponseType) => ({
        type: 'SET_USER_PROFILE',
        payload: profile
    } as const),

    setUserStatus: (status: string) => ({
        type: 'SET_USER_STATUS',
        payload: status
    } as const),

    setUserIsLoading: () => ({
        type: 'SET_USER_IS_LOADING'
    } as const),

    setUserPhoto: (photos: PhotoType) => ({
        type: 'SET_USER_PHOTO',
        payload: photos
    } as const),

    addPost: (postText: string) => ({
        type: 'ADD_POST',
        payload: postText
    } as const)

}

export const getUserProfile = (userId: UserIdType) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    dispatch(profileActions.setUserIsLoading())
    const { data } = await getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
}

export const getUserStatus = (userId: UserIdType) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await getStatus(userId)
    dispatch(profileActions.setUserStatus(data))
}

export const updateUserStatus = (newStatus: string) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await updateStatus(newStatus)
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(profileActions.setUserStatus(newStatus))
    }
}

export const updateUserPhotoThunk = (photo: File) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await updateUserPhoto(photo)
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(profileActions.setUserPhoto(data.data.photos))
    }
}

const initialState = {
    profile: null as GetProfileResponseType | null,
    posts: [
        { id: 1, text: 'Пост 1' },
        { id: 2, text: 'Пост 2' }
    ] as Array<Post>,
    status: null as string | null,
    isLoading: false
}

type StateType = typeof initialState
type ProfileActionTypes = InferActionsTypes<typeof profileActions>

export const profileReducer = (state = initialState, action: ProfileActionTypes): StateType => {
    switch (action.type) {
        case 'ADD_POST': {
            const newPost = {
                id: Date.now(),
                text: action.payload
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }

        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        }

        case 'SET_USER_STATUS' : {
            return {
                ...state,
                status: action.payload
            }
        }

        case 'SET_USER_IS_LOADING': {
            return {
                ...state,
                isLoading: true
            }
        }

        case 'SET_USER_PHOTO': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload } as GetProfileResponseType
            }
        }

        default:
            return state
    }
}
