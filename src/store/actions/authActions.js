import { types } from '../types'

export const setAuthUserData = data => dispatch => {

    dispatch(setLoading())

    const userId = data.data.id
    const { email, login } = data.data
    return {
        type: types.auth.SET_USER_DATA,
        payload: { userId, email, login }
    }
}

const setLoading = () => ({
    type: types.auth.SET_LOADING
})