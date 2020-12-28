import { Dispatch } from 'redux'
import { ResultCodeEnum } from '../api/api'
import { followUser, getUsers, GetUsersResponseType, unfollowUser, UserType } from '../api/users'
import { InferActionsTypes } from './index'

export const usersActions = {

    followUser: (userId: UserIdType) => ({
        type: 'FOLLOW',
        payload: userId
    } as const),

    unfollowUser: (userId: UserIdType) => ({
        type: 'UNFOLLOW',
        payload: userId
    } as const),

    setUsers: (data: GetUsersResponseType) => ({
        type: 'SET_USERS',
        payload: data
    } as const),

    setLoading: () => ({
        type: 'SET_LOADING'
    } as const),

    setFollowPending: (isPending: boolean, userId: UserIdType) => ({
        type: 'SET_FOLLOW_PENDING',
        payload: {
            isPending,
            userId
        }
    } as const),

    setFilter: (term: string) => ({
        type: 'SET_FILTER',
        payload: {
            term
        }
    } as const)

}

export const fetchUsers = (currentPage: number, pageSize: number, filter: { term: string; friend: boolean }) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(usersActions.setLoading())
    const { data } = await getUsers(currentPage, pageSize, filter)
    dispatch(usersActions.setUsers(data))
}

export const followUserThunk = (userId: UserIdType) => async (dispatch: Dispatch<UserActionTypes>) => {
    await followUnfollowFlow(dispatch, userId, followUser, usersActions.followUser)
}

export const unfollowUserThunk = (userId: UserIdType) => async (dispatch: Dispatch<UserActionTypes>) => {
    await followUnfollowFlow(dispatch, userId, unfollowUser, usersActions.unfollowUser)
}

const followUnfollowFlow = async (dispatch: Dispatch<UserActionTypes>, userId: UserIdType, apiMethod: any, actionCreator: (userId: UserIdType) => UserActionTypes) => {

    dispatch(usersActions.setFollowPending(true, userId))

    const { data } = await apiMethod(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
        dispatch(usersActions.setFollowPending(false, userId))
    }
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    isLoading: false,
    isFollowPending: [] as Array<UserIdType>,
    filter: {
        term: ''
    },
    currentPage: 1 as number
}

type StateType = typeof initialState

type UserActionTypes = InferActionsTypes<typeof usersActions>

export const usersReducer = (state = initialState, action: UserActionTypes): StateType => {
    switch (action.type) {
        case 'FOLLOW': {
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

        case 'UNFOLLOW': {
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

        case 'SET_USERS': {
            return {
                ...state,
                users: action.payload.items,
                totalUsersCount: action.payload.totalCount,
                isLoading: false
            }
        }

        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: true
            }
        }

        case 'SET_FOLLOW_PENDING': {
            return {
                ...state,
                isFollowPending: action.payload.isPending
                    ? [...state.isFollowPending, action.payload.userId]
                    : state.isFollowPending.filter(id => id !== action.payload.userId)
            }
        }

        case 'SET_FILTER': {
            return {
                ...state,
                filter: action.payload
            }
        }

        default:
            return state
    }
}
