import { types } from '../types'
import { getAuthUserData } from './authActions'

const initializeSuccess = () => ({
    type: types.app.SET_INITIALIZED
})

export const initializeApp = () => dispatch => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => {
            dispatch(initializeSuccess())
        })
}