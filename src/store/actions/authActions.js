import { types } from '../types'
import { authAPI } from '../../api/api'
import { stopSubmit } from 'redux-form'

export const authActions = {
    login: (email, password, rememberMe) => dispatch => {
        authAPI.login(email, password, rememberMe)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    const stopSubmitAction = stopSubmit('login', { _error: data.messages })
                    dispatch(stopSubmitAction)
                }
            })
    },
    logout: () => dispatch => {
        authAPI.logout()
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
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

export const getAuthUserData = () => dispatch => {

    dispatch(setIsLoading(true))
    console.log('auth/me')
    return authAPI.auth()
        .then(({ data }) => {
            if (data.resultCode === 0) {
                console.log('auth/me success')
                const { id, email, login } = data.data
                dispatch(setAuthUserData(id, email, login, true))
                dispatch(setIsLoading(false))
            }
        })
}
