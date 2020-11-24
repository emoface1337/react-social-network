import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import DialogUser from './DialogUser/DialogUser'
import DialogMessage from './DialogMessage/DialogMessage'

import { Box, Grid, List, makeStyles } from '@material-ui/core'

import { RootState } from '../../ducks'
import { dialogsActions} from '../../ducks/dialogs'

const useStyles = makeStyles(theme => ({
    dialogs: {
        display: 'flex',
        flexDirection: 'row'
    },
    gridItemLeft: {
        borderRight: `1px solid #e7e8ec`,
        padding: '10px 0'
    },
    gridItemRight: {
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
}))

const { sendMessage } = dialogsActions

const Dialogs = () => {

    const classes = useStyles()

    const newMessageInput = React.createRef<HTMLInputElement>()

    const { dialogs, messages } = useSelector((state: RootState) => state.dialogs)

    const dispatch = useDispatch()

    const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const message = newMessageInput.current!.value
        if (event.key === 'Enter' && message !== '') {
            dispatch(sendMessage(message))
        }
    }

    return (
        <Grid container spacing={0} style={{ height: 'calc(100vh - 100px)' }}>
            <Grid item xs={4} className={classes.gridItemLeft}>
                <List>
                    {
                        dialogs.map(dialog => (
                            <DialogUser key={`${dialog.id}_${dialog.name}`} dialog={dialog}/>
                        ))
                    }
                </List>
            </Grid>
            <Grid item xs={8} className={classes.gridItemRight}>
                <List>
                    {
                        messages.map(message => (
                            <DialogMessage key={`${message.id}_${message.text}`} message={message}/>
                        ))
                    }
                </List>
                <Box style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    <input type="textarea"
                           id="message"
                           placeholder="Напишите сообщение..."
                           style={{
                               width: '100%',
                               padding: '10px 0 10px 10px',
                               borderRadius: '6px',
                               border: '1px solid #e7e8ec'
                           }}
                           onKeyDown={event => handleSendMessage(event)}
                           ref={newMessageInput}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default withAuthRedirect(Dialogs)
