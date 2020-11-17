import { types } from '../types'
import { authAPI } from '../../api/api'
import { stopSubmit } from 'redux-form'

export const authActions = {

    login: (email, password, rememberMe) => async dispatch => {
        const { data } = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
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

export const getAuthUserData = () => async dispatch => {

    dispatch(setIsLoading(true))

    const { data } = await authAPI.auth()

    if (data.resultCode === 0) {
        const { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(setIsLoading(false))
    }
}
