import { types } from '../types'
import { authAPI } from '../../api/api'

export const authActions = {
    login: (email, password, rememberMe) => dispatch => {
        authAPI.login(email, password, rememberMe)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
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

const getAuthUserData = () => dispatch => {

    dispatch(setIsLoading(true))

    authAPI.auth()
        .then(({ data }) => {
            console.log(data)
            if (data.resultCode === 0) {
                const { id, email, login } = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
        .finally(dispatch(setIsLoading(false)))
}
