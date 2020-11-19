import { SEND_MESSAGE } from '../types'

export const dialogsActions = {
    sendMessage: (message: string) => ({
        type: SEND_MESSAGE,
        payload: message
    })
}
