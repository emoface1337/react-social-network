import { Dispatch } from 'redux'
import { ResultCodeEnums } from '../api/api'
import { getUsers, GetUsersResponseType, UserType } from '../api/users'

export const FOLLOW = 'USERS/FOLLOW'
export const UNFOLLOW = 'USERS/UNFOLLOW'
export const SET_USERS = 'USERS/SET_USERS'
export const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
export const SET_LOADING = 'USERS/SET_LOADING'
export const SET_FOLLOW_PENDING = 'USERS/SET_FOLLOW_PENDING'

type UserFollow = {
    type: typeof FOLLOW,
    payload: number | string
}

type UserUnfollow = {
    type: typeof UNFOLLOW,
    payload: number | string
}

type SetUsers = {
    type: typeof SET_USERS,
    payload: any
}

type SetCurrentPage = {
    type: typeof SET_CURRENT_PAGE,
    payload: number
}

type SetLoading = {
    type: typeof SET_LOADING
}

type SetFollowPending = {
    payload: {
        isPending: boolean,
        userId: number | string
    }
    type: typeof SET_FOLLOW_PENDING
}

type UserActionTypes = UserFollow | UserUnfollow | SetUsers | SetCurrentPage | SetLoading | SetFollowPending

export const fetchUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(setLoading())
    const { data } = await getUsers(currentPage, pageSize)
    dispatch(setUsers(data))
}

export const followUserThunk = (userId: UserIdType) => async (dispatch: Dispatch<UserActionTypes>) => {
    await followUnfollowFlow(dispatch, userId, followUser, followUser)
}

export const unfollowUserThunk = (userId: UserIdType) => async (dispatch: Dispatch<UserActionTypes>) => {
    await followUnfollowFlow(dispatch, userId, unfollowUser, unfollowUser)
}

const followUser = (userId: UserIdType): UserActionTypes => ({
    type: FOLLOW,
    payload: userId
})

const unfollowUser = (userId: UserIdType): UserActionTypes => ({
    type: UNFOLLOW,
    payload: userId
})

const setUsers = (data: GetUsersResponseType): UserActionTypes => ({
    type: SET_USERS,
    payload: data
})

const setLoading = (): UserActionTypes => ({
    type: SET_LOADING
})

const setFollowPending = (isPending: boolean, userId: UserIdType): UserActionTypes => ({
    type: SET_FOLLOW_PENDING,
    payload: {
        isPending,
        userId
    }
})

const followUnfollowFlow = async (dispatch: Dispatch<UserActionTypes>, userId: UserIdType, apiMethod: any, actionCreator: (userId: UserIdType) => UserActionTypes) => {

    dispatch(setFollowPending(true, userId))

    const { data } = await apiMethod(userId)
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(actionCreator(userId))
        dispatch(setFollowPending(false, userId))
    }
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    isLoading: false,
    isFollowPending: [] as Array<UserIdType>
}

type StateType = typeof initialState

export const usersReducer = (state = initialState, action: UserActionTypes): StateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }
        }

        case SET_USERS: {
            return {
                ...state,
                users: action.payload.items,
                totalUsersCount: action.payload.totalCount,
                isLoading: false
            }
        }

        case SET_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SET_FOLLOW_PENDING: {
            return {
                ...state,
                isFollowPending: action.payload.isPending
                    ? [...state.isFollowPending, action.payload.userId]
                    : state.isFollowPending.filter(id => id !== action.payload.userId)
            }
        }

        default:
            return state
    }
}
