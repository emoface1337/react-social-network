import { types } from '../types'
import { authAPI } from '../../api/api'

export const authActions = {
    getAuthUserData: () => dispatch => {

        dispatch(setIsLoading(true))

        authAPI.auth().then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data))
            }
        })
            .finally(dispatch(setIsLoading(false)))
    }
}

const setIsLoading = loading => ({
    type: types.auth.SET_IS_LOADING,
    payload: loading
})

const setAuthUserData = data => ({
    type: types.auth.SET_USER_DATA,
    payload: { id: data.data.id, email: data.data.email, login: data.data.login }
})
