import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import DialogUser from './DialogUser/DialogUser'
import DialogMessage from './DialogMessage/DialogMessage'

import { Box, List, Grid, makeStyles } from '@material-ui/core'

// import withAuthRedirect from '../../hoc/withAuthRedirect'

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

const Dialogs = ({ dialogs, messages }) => {

    const classes = useStyles()

    return (
        <Grid container spacing={0} style={{ height: '50vh' }}>
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
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, null)
// withAuthRedirect
)(Dialogs)