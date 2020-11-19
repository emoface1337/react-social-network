import {
    USERS_FOLLOW,
    USERS_SET_CURRENT_PAGE,
    USERS_SET_FOLLOW_PENDING,
    USERS_SET_LOADING,
    USERS_SET_USERS,
    USERS_UNFOLLOW,
    userActionTypes
} from '../types'

const initialState = {
    users: [] as Array<any>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isLoading: false as boolean,
    isFollowPending: [] as Array<any>
}

type stateType = typeof initialState

export const usersReducer = (state: stateType = initialState, action: userActionTypes): stateType => {
    switch (action.type) {
        case USERS_FOLLOW: {
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

        case USERS_UNFOLLOW: {
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

        case USERS_SET_USERS: {
            return {
                ...state,
                users: [...action.payload.items],
                totalUsersCount: action.payload.totalCount,
                isLoading: false
            }
        }

        case USERS_SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }

        case USERS_SET_LOADING: {
            return {
                ...state,
                users: [],
                isLoading: true
            }
        }

        case USERS_SET_FOLLOW_PENDING: {
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
