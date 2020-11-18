import { types } from '../types'
import { authAPI, securityAPI } from '../../api/api'
import { stopSubmit } from 'redux-form'

export const authActions = {

    login: (email, password, rememberMe, captcha) => async dispatch => {
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

    logout: () => async dispatch => {
        const { data } = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const getAuthUserData = () => async dispatch => {

    dispatch(setIsLoading(true))

    const { data } = await authAPI.auth()

    if (data.resultCode === 0) {
        const { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(setIsLoading(false))
    }
}

const getCaptchaUrl = () => async dispatch => {
    const { data } = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(setUserCaptcha(captchaUrl))
}

const setIsLoading = loading => ({
    type: types.auth.SET_IS_LOADING,
    payload: loading
})

const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: types.auth.SET_USER_DATA,
        payload: {
            isAuth,
            user: { id: userId, email, login }
        }
    }
}

const setUserCaptcha = (captchaUrl) => ({
    type: types.auth.SET_USER_CAPTCHA,
    payload: captchaUrl
})
