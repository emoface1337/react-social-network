import { dialogsActionTypes, SEND_MESSAGE } from '../types'

type Dialog = {
    id: number,
    name: string
}

type Message = {
    id: number,
    text: string
}

const initialState = {
    dialogs: [
        { id: 1, name: 'Яна' },
        { id: 2, name: 'Вася' }
    ] as Array<Dialog>,
    messages: [
        { id: 1, text: 'Привет 1' },
        { id: 2, text: 'Привет 2' }
    ] as Array<Message>
}

type stateType = typeof initialState

export const dialogsReducer = (state: stateType = initialState, action: dialogsActionTypes): stateType => {
    switch (action.type) {

        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: Date.now(), text: action.payload }]
            }
        }
        default:
            return state
    }
}
