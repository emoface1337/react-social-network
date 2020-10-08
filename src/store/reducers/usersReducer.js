import { types } from '../types'

const initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false
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

        case types.users.SET_LOADING:{
            return {
                ...state,
                users: [],
                isLoading: true
            }
        }
        default:
            return state
    }
}