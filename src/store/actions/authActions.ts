import { authActionTypes, SET_IS_LOADING, SET_USER_CAPTCHA, SET_USER_DATA } from '../types'
import { authAPI, securityAPI } from '../../api/api'
import { stopSubmit } from 'redux-form'
import { dispatchType } from '../store'

export const authActions = {

    login: (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: dispatchType) => {
        const { data } = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        } else {
            const stopSubmitAction = stopSubmit('login', { _error: data.messages })
            dispatch(stopSubmitAction)
        }
    },

    logout: () => async (dispatch: dispatchType) => {
        const { data } = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const getAuthUserData = () => async (dispatch: dispatchType) => {

    dispatch(setIsLoading(true))

    const { data } = await authAPI.auth()

    if (data.resultCode === 0) {
        const { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(setIsLoading(false))
    }
}

const getCaptchaUrl = () => async (dispatch: dispatchType) => {
    const { data } = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(setUserCaptcha(captchaUrl))
}

const setIsLoading = (loading: boolean): authActionTypes => ({
    type: SET_IS_LOADING,
    payload: loading
})

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): authActionTypes => ({
    type: SET_USER_DATA,
    payload: {
        isAuth,
        user: { id: userId, email, login }
    }
})

const setUserCaptcha = (captchaUrl: string): authActionTypes => ({
    type: SET_USER_CAPTCHA,
    payload: captchaUrl
})
