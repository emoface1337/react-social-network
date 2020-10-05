import React from 'react'
import { connect } from 'react-redux'

import DialogUser from './DialogUser/DialogUser'
import DialogMessage from './DialogMessage/DialogMessage'

import { Box, List, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    dialogs: {
        display: 'flex',
        flexDirection: 'row'
    },
    dialogsLeft: {
        width: '320px'
    },
    dialogsRight: {
        width: '100%'
    }
}))

const Dialogs = (props) => {

    const classes = useStyles()

    return (
        <Box className={classes.dialogs}>
            <List className={classes.dialogsLeft}>
                {
                    props.dialogs.map(dialog => (
                        <DialogUser key={`${dialog.id}_${dialog.name}`} dialog={dialog}/>
                    ))
                }
            </List>
            <Box className={classes.dialogsRight}>
                {
                    props.messages.map(message => (
                        <DialogMessage key={`${message.id}_${message.text}`} message={message}/>
                    ))
                }
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    dialogs: state.dialogsReducer.dialogs,
    messages: state.dialogsReducer.messages
})

export default connect(mapStateToProps, null)(Dialogs)