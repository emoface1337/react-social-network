import { appActionTypes, SET_INITIALIZED } from '../types'

const initialState = {
    initialized: false as boolean | null
}

type stateType = typeof initialState

export const appReducer = (state: stateType = initialState, action: appActionTypes): stateType => {

    switch (action.type) {

        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state
    }
}
