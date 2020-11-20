import { appActionTypes, SET_INITIALIZED } from '../types'
import { getAuthUserData } from './authActions'
import { dispatchType } from '../store'

const initializeSuccess = (): appActionTypes => ({
    type: SET_INITIALIZED
})

export const initializeApp = () => (dispatch: dispatchType) => {
    Promise.all([dispatch(getAuthUserData())])
        .then(() => {
            dispatch(initializeSuccess())
        })
}
