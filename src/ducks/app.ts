import { getAuthUserDataThunk } from './auth'

const SET_INITIALIZED = 'APP/SET_INITIALIZED'

type SetInitialized = {
    type: typeof SET_INITIALIZED
}

type AppActionTypes = SetInitialized

const initializeSuccess = (): AppActionTypes => ({
    type: SET_INITIALIZED
})

export const initializeApp = () => (dispatch: any) => {
    Promise.all([dispatch(getAuthUserDataThunk())])
        .then(() => {
            dispatch(initializeSuccess())
        })
}

const initialState = {
    initialized: false
}

type StateType = typeof initialState

export const appReducer = (state = initialState, action: AppActionTypes): StateType => {

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
