import { types } from '../types'

const initialState = {
    dialogs: [
        { id: 1, name: 'Яна' },
        { id: 2, name: 'Вася' }
    ],
    messages: [
        { id: 1, text: 'Привет 1' },
        { id: 2, text: 'Привет 2' }
    ]
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.dialogs.SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: Date.now(), text: action.payload }]
            }
        }
        default:
            return state
    }
}