export const SET_INITIALIZED = 'APP/SET_INITIALIZED'

type SetInitialized = {
    type: typeof SET_INITIALIZED
}

export const SET_USER_DATA = 'AUTH/SET_USER_DATA'
export const SET_IS_LOADING = 'AUTH/SET_IS_LOADING'
export const LOGIN = 'AUTH/LOGIN'
export const LOGOUT = 'AUTH/LOGOUT'
export const SET_USER_CAPTCHA = 'AUTH/SET_USER_CAPTCHA'

type SetUserData = {
    type: typeof SET_USER_DATA,
    payload: {
        user: {
            id: number | string | null,
            email: string | null,
            login: string | null,

        },
        isAuth: boolean
    }
}

type SetIsLoading = {
    type: typeof SET_IS_LOADING,
    payload: boolean
}

type SetUserCaptcha = {
    type: typeof SET_USER_CAPTCHA,
    payload: string
}

export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

type SendMessage = {
    type: typeof SEND_MESSAGE,
    payload: string
}

export const USERS_FOLLOW = 'USERS/USERS_FOLLOW'
export const USERS_UNFOLLOW = 'USERS/USERS_UNFOLLOW'
export const USERS_SET_USERS = 'USERS/SET_USERS'
export const USERS_SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
export const USERS_SET_LOADING = 'USERS/SET_LOADING'
export const USERS_SET_FOLLOW_PENDING = 'USERS/SET_FOLLOW_PENDING'

type UserFollow = {
    type: typeof USERS_FOLLOW,
    payload: number | string
}

type UserUnfollow = {
    type: typeof USERS_UNFOLLOW,
    payload: number | string
}

type SetUsers = {
    type: typeof USERS_SET_USERS,
    payload: any
}

type SetCurrentPage = {
    type: typeof USERS_SET_CURRENT_PAGE,
    payload: number
}

type SetLoading= {
    type: typeof USERS_SET_LOADING
}

type SetFollowPending = {
    payload: {
        isPending: boolean,
        userId: number | string
    }
    type: typeof USERS_SET_FOLLOW_PENDING
}

export const PROFILE_ADD_POST = 'PROFILE/ADD_POST'
export const PROFILE_SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
export const PROFILE_SET_USER_STATUS = 'PROFILE/SET_USER_STATUS'
export const PROFILE_UPDATE_USER_STATUS = 'PROFILE/UPDATE_USER_STATUS'
export const PROFILE_SET_USER_IS_LOADING = 'PROFILE/SET_USER_IS_LOADING'
export const PROFILE_SET_USER_PHOTO = 'PROFILE/SET_USER_PHOTO'

type AddPost = {
    type: typeof PROFILE_ADD_POST,
    payload: string
}

type SetUserProfile = {
    type: typeof PROFILE_SET_USER_PROFILE,
    payload: any
}

type SetUserStatus = {
    type: typeof PROFILE_SET_USER_STATUS,
    payload: string
}

type UpdateUserStatus = {
    type: typeof PROFILE_UPDATE_USER_STATUS,
    payload: string
}

type SetUserIsLoading = {
    type: typeof PROFILE_SET_USER_IS_LOADING
}

type SetUserPhoto = {
    type: typeof PROFILE_SET_USER_PHOTO
    payload: any
}

export type authActionTypes = SetUserData | SetIsLoading | SetUserCaptcha
export type appActionTypes = SetInitialized
export type dialogsActionTypes = SendMessage
export type userActionTypes =
    UserFollow
    | UserUnfollow
    | SetUsers
    | SetCurrentPage
    | SetLoading
    | SetFollowPending
export type profileActionTypes = AddPost | SetUserProfile | SetUserStatus | UpdateUserStatus | SetUserIsLoading | SetUserPhoto
