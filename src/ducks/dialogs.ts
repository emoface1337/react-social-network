export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

type SendMessage = {
    type: typeof SEND_MESSAGE,
    payload: string
}

type DialogsActionTypes = SendMessage

export const sendMessage = (message: string): DialogsActionTypes => ({
    type: SEND_MESSAGE,
    payload: message
})

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

export const dialogsReducer = (state = initialState, action: DialogsActionTypes): StateType => {
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
