import { types } from '../types'

export const dialogsActions = {
    sendMessage: message => ({
        type: types.dialogs.SEND_MESSAGE,
        payload: message
    })
}
