import { Dispatch } from 'redux'
import { ResultCodeEnums } from '../api/api'
import { getProfile, GetProfileResponseType, getStatus, PhotoType, updateStatus, updateUserPhoto } from '../api/profile'

export const ADD_POST = 'PROFILE/ADD_POST'
export const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
export const SET_USER_STATUS = 'PROFILE/SET_USER_STATUS'
export const UPDATE_USER_STATUS = 'PROFILE/UPDATE_USER_STATUS'
export const SET_USER_IS_LOADING = 'PROFILE/SET_USER_IS_LOADING'
export const SET_USER_PHOTO = 'PROFILE/SET_USER_PHOTO'

type AddPost = {
    type: typeof ADD_POST,
    payload: string
}

type SetUserProfile = {
    type: typeof SET_USER_PROFILE,
    payload: GetProfileResponseType
}

type SetUserStatus = {
    type: typeof SET_USER_STATUS,
    payload: string
}

type UpdateUserStatus = {
    type: typeof UPDATE_USER_STATUS,
    payload: string
}

type SetUserIsLoading = {
    type: typeof SET_USER_IS_LOADING
}

type SetUserPhoto = {
    type: typeof SET_USER_PHOTO
    payload: PhotoType
}

type ProfileActionTypes = AddPost | SetUserProfile | SetUserStatus | UpdateUserStatus | SetUserIsLoading | SetUserPhoto

export const addPost = (postText: string): ProfileActionTypes => ({
    type: ADD_POST,
    payload: postText
})

export const getUserProfile = (userId: UserIdType) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    dispatch(setUserIsLoading())
    const { data } = await getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId: UserIdType) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await getStatus(userId)
    dispatch(setUserStatus(data))
}

export const updateUserStatus = (newStatus: string) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await updateStatus(newStatus)
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(setUserStatus(newStatus))
    }
}

export const updateUserPhotoThunk = (photo: File) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    const { data } = await updateUserPhoto(photo)
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(setUserPhoto(data.data.photos))
    }
}

const setUserProfile = (profile: GetProfileResponseType): ProfileActionTypes => ({
    type: SET_USER_PROFILE,
    payload: profile
})

const setUserStatus = (status: string): ProfileActionTypes => ({
    type: SET_USER_STATUS,
    payload: status
})

const setUserIsLoading = (): ProfileActionTypes => ({
    type: SET_USER_IS_LOADING
})

const setUserPhoto = (photos: PhotoType): ProfileActionTypes => ({
    type: SET_USER_PHOTO,
    payload: photos
})

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

export const profileReducer = (state = initialState, action: ProfileActionTypes): StateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: Date.now(),
                text: action.payload
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        }

        case SET_USER_STATUS : {
            return {
                ...state,
                status: action.payload
            }
        }

        case SET_USER_IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SET_USER_PHOTO: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload } as GetProfileResponseType
            }
        }

        default:
            return state
    }
}
