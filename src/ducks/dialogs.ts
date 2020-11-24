import { InferActionsTypes } from './index'

export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

export const dialogsActions = {

    sendMessage: (message: string) => ({
        type: 'SEND_MESSAGE',
        payload: message
    } as const)

}


const initialState = {
    dialogs: [
        { id: 1, name: 'Яна' },
        { id: 2, name: 'Вася' }
    ] as Array<UserDialog>,
    messages: [
        { id: 1, text: 'Привет 1' },
        { id: 2, text: 'Привет 2' }
    ] as Array<UserMessage>
}

type StateType = typeof initialState
type DialogsActionTypes = InferActionsTypes<typeof dialogsActions>

export const dialogsReducer = (state = initialState, action: DialogsActionTypes): StateType => {

    switch (action.type) {

        case 'SEND_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, { id: Date.now(), text: action.payload }]
            }
        }
        default:
            return state
    }
}
