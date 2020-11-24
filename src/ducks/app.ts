import { getAuthUserDataThunk } from './auth'
import { InferActionsTypes } from './index'

export const appActions = {
    initializeSuccess: () => ({
        type: 'SET_INITIALIZED'
    } as const)
}

export const initializeApp = () => (dispatch: any) => {
    Promise.all([dispatch(getAuthUserDataThunk())])
        .then(() => {
            dispatch(appActions.initializeSuccess())
        })
}

const initialState = {
    initialized: false
}

type StateType = typeof initialState

type AppActionTypes = InferActionsTypes<typeof appActions>

export const appReducer = (state = initialState, action: AppActionTypes): StateType => {

    switch (action.type) {
        case 'SET_INITIALIZED': {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state
    }
}
