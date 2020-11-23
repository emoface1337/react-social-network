import { authActionTypes, SET_IS_LOADING, SET_USER_CAPTCHA, SET_USER_DATA } from "../types";

const initialState = {
    userId: null as number | string | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false,
    captchaUrl: null as string | null
}

type stateType = typeof initialState

export const authReducer = (state = initialState, action: authActionTypes): stateType => {

    switch (action.type) {

        case SET_USER_DATA: {

            const {id, email, login} = action.payload.user

            return {
                ...state,
                userId: id,
                email,
                login,
                isAuth: action.payload.isAuth
            }
        }

        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }

        case SET_USER_CAPTCHA : {
            return {
                ...state,
                captchaUrl: action.payload
            }
        }

        default:
            return state
    }
}
