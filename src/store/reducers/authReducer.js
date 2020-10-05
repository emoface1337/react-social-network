import { types } from '../types'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.auth.SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuth: true
            }
        }

        case types.auth.SET_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }

        default:
            return state
    }
}