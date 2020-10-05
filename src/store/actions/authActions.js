import { types } from '../types'

export const setAuthUserData = data => {
    const userId = data.data.id
    const { email, login } = data.data
    return {
        type: types.auth.SET_USER_DATA,
        payload: { userId, email, login }
    }
}

export const setLoading = () => ({
    type: types.auth.SET_LOADING
})