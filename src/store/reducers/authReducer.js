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

            const { id, email, login } = action.payload.user

            return {
                ...state,
                userId: id,
                email,
                login,
                isAuth: action.payload.isAuth
            }
        }

        case types.auth.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }

        default:
            return state
    }
}