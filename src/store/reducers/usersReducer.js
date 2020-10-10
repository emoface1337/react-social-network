import { types } from '../types'

const initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowPending: []
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.users.FOLLOW: {
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

        case types.users.UNFOLLOW: {
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

        case types.users.SET_USERS: {
            return {
                ...state,
                users: [...action.payload.items],
                totalUsersCount: action.payload.totalCount,
                isLoading: false
            }
        }

        case types.users.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }

        case types.users.SET_LOADING: {
            return {
                ...state,
                users: [],
                isLoading: true
            }
        }

        case types.users.SET_FOLLOW_PENDING: {
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