import { dialogsActionTypes, SEND_MESSAGE } from '../types'

export const dialogsActions = {
    sendMessage: (message: string): dialogsActionTypes => ({
        type: SEND_MESSAGE,
        payload: message
    })
}
