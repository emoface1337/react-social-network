import { Dispatch } from 'redux'
import { stopSubmit } from 'redux-form'

import { ResultCodeEnums, ResultCodeForCaptcha } from '../api/api'
import { getCaptchaUrl, isAuthorized, login, logout } from '../api/auth'
import { InferActionsTypes } from './index'

const authActions = {
    setIsLoading: (loading: boolean) => ({
        type: 'SET_IS_LOADING',
        payload: loading
    } as const),

    setAuthUserData: (userId: UserIdType | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {
            isAuth,
            user: { id: userId, email, login }
        }
    } as const),

    setUserCaptcha: (captchaUrl: string) => ({
        type: 'SET_USER_CAPTCHA',
        payload: captchaUrl
    } as const)
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const { data } = await login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnums.Success) {
        await dispatch(getAuthUserDataThunk())
    } else if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        await dispatch(getCaptchaUrlThunk())
    } else {
        const stopSubmitAction = stopSubmit('login', { _error: data.messages })
        dispatch(stopSubmitAction)
    }
}

export const logoutThunk = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    const { data } = await logout()
    if (data.resultCode === ResultCodeEnums.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
}

export const getAuthUserDataThunk = () => async (dispatch: Dispatch<AuthActionTypes>) => {

    dispatch(authActions.setIsLoading(true))

    const { data } = await isAuthorized()

    if (data.resultCode === ResultCodeEnums.Success) {
        const { id, email, login } = data.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
        dispatch(authActions.setIsLoading(false))
    }
}

const getCaptchaUrlThunk = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    const { data } = await getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(authActions.setUserCaptcha(captchaUrl))
}

const initialState = {
    userId: null as UserIdType | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false,
    captchaUrl: null as string | null
}

type StateType = typeof initialState
type AuthActionTypes = InferActionsTypes<typeof authActions>

export const authReducer = (state = initialState, action: AuthActionTypes): StateType => {

    switch (action.type) {

        case 'SET_USER_DATA': {

            const { id, email, login } = action.payload.user

            return {
                ...state,
                userId: id,
                email,
                login,
                isAuth: action.payload.isAuth
            }
        }

        case 'SET_IS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }

        case 'SET_USER_CAPTCHA' : {
            return {
                ...state,
                captchaUrl: action.payload
            }
        }

        default:
            return state
    }
}
