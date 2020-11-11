import { types } from '../types'

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.app.SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}