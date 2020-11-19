import { SET_INITIALIZED } from '../types'
import { getAuthUserData } from './authActions'
import { dispatchType } from '../store'

const initializeSuccess = () => ({
    type: SET_INITIALIZED
})

export const initializeApp = () => (dispatch: dispatchType) => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => {
            dispatch(initializeSuccess())
        })
}
