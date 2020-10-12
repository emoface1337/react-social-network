import React, { useEffect, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setTitle } from '../../utils'

import {
    fetchUsers,
    followUserThunk,
    setCurrentPage,
    unfollowUserThunk
} from '../../store/actions/usersActions'

import Pagination from '@material-ui/lab/Pagination'
import Loader from '../Loader/Loader'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box, Grid, Button, makeStyles } from '@material-ui/core'

import defaultUserAvatar from '../../assets/images/default-avatar.jpg'

const useStyles = makeStyles(() => ({
    user: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        padding: '10px 10px',
        borderRadius: '5px',
        '&__photo': {
            width: '60px',
            height: '60px',
            borderRadius: '100%',
            marginBottom: '15px'
        },
        '&__name': {
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: '135px'
        }
    },
    usersPagination: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    wrapper: {
        position: 'relative',
        marginBottom: '15px'
    }
}))

const Users = (props) => {

    const { users, followUser, unfollowUser, currentPage, pageSize, isLoading, isFollowPending, totalUsersCount, setCurrentPage, fetchUsers} = props

    useEffect(() => {
        return setTitle('Пользователи')
    }, [])

    useLayoutEffect(() => {
        fetchUsers(currentPage, pageSize)
    }, [currentPage, pageSize, fetchUsers])

    const classes = useStyles()

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const [pageNum, setPageNumState] = React.useState(1)
    const handleChange = (event, value) => {
        setPageNumState(value)
        setCurrentPage(value)
    }

    const handleFollow = (event, userId, followed) => {
        event.preventDefault()
        followed
            ? unfollowUser(userId)
            : followUser(userId)
    }

    if (isLoading)
        return <Loader/>

    return (
        <Box>
            <Box className={classes.usersPagination}>
                <Pagination variant="outlined" count={pagesCount} page={pageNum} onChange={handleChange}/>
            </Box>
            <Grid container spacing={3}>
                {
                    users.map(user => (
                        <Grid item xs={3} key={user.id}>
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
                                            {isFollowPending.some(id => id === user.id) &&
                                            <CircularProgress size={24} className={classes.buttonProgress}/>}
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
                    ))
                }
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    users: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    totalUsersCount: state.usersReducer.totalUsersCount,
    currentPage: state.usersReducer.currentPage,
    isLoading: state.usersReducer.isLoading,
    isFollowPending: state.usersReducer.isFollowPending
})

const mapDispatchToProps = {
    followUser: followUserThunk,
    unfollowUser: unfollowUserThunk,
    setCurrentPage,
    fetchUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)