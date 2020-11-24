import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import defaultUserAvatar from '../../../assets/images/default-avatar.jpg'
import { Box, Button, CircularProgress, Grid } from '@material-ui/core'
import { followUserThunk, unfollowUserThunk } from '../../../ducks/users'

type Props = {
    user: any
    isFollowPending: Array<FollowPendingType>,
    classes: any
}

const User: React.FC<Props> = ({ user, isFollowPending, classes }) => {

    const dispatch = useDispatch()

    const handleFollow = (event: React.MouseEvent, userId: any, followed: boolean) => {
        event.preventDefault()
        followed
            ? dispatch(unfollowUserThunk(userId))
            : dispatch(followUserThunk(userId))
    }

    return (
        <Grid item xs={3}>
            <NavLink to={'/profile/' + user.id} className={classes.user}>
                <img
                    src={user.photos.small !== null ? user.photos.small : defaultUserAvatar}
                    alt={user.name} className={`${classes.user}__photo`}/>
                {
                    user.followed ?
                        <div className={classes.wrapper}>
                            <Button variant="contained" color="secondary" size="small"
                                    disabled={isFollowPending.some(id => id === user.id)}
                                    onClick={event => handleFollow(event, user.id, user.followed)}>Отписаться</Button>
                            {
                                isFollowPending.some(id => id === user.id) &&
                                <CircularProgress size={24} className={classes.buttonProgress}/>
                            }
                        </div>
                        :
                        <div className={classes.wrapper}>
                            <Button variant="contained" color="secondary" size="small"
                                    disabled={isFollowPending.some(id => id === user.id)}
                                    onClick={event => handleFollow(event, user.id, user.followed)}>Подписаться</Button>
                            {isFollowPending.some(id => id === user.id) &&
                            <CircularProgress size={22} className={classes.buttonProgress}/>}
                        </div>
                }
                <Box className={`${classes.user}__name`}>{user.name}</Box>
            </NavLink>
        </Grid>
    )
}

export default User
