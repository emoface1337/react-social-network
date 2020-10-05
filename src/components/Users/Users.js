import React, { useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { followUser, setCurrentPage, setLoading, setUsers, unfollowUser } from '../../store/actions/usersActions'

import { NavLink } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import Loader from '../../Loader/Loader'

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
        '&__button': {
            marginBottom: '15px'
        },
        '&__name': {
            fontWeight: 'bold'
        }
    },
    usersPagination: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Users = (props) => {

    const { currentPage, setUsers, pageSize, isLoading, setLoading, totalUsersCount, setCurrentPage } = props

    useLayoutEffect(() => {
        setLoading()
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(({ data }) => setUsers(data))
    }, [currentPage, setUsers, pageSize, setLoading])

    const classes = useStyles()

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const [pageNum, setPageNumState] = React.useState(1)
    const handleChange = (event, value) => {
        setPageNumState(value)
        setCurrentPage(value)
    }

    const handleFollow = (event, userId, followed) => {
        event.preventDefault()
        followed ? props.unfollowUser(userId) : props.followUser(userId)
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
                    props.users.map(user => (
                        <Grid item xs={3} key={user.id}>
                            <NavLink to={'/profile/' + user.id} className={classes.user}>
                                <img
                                    src={user.photos.small !== null ? user.photos.small : defaultUserAvatar}
                                    alt={user.name} className={`${classes.user}__photo`}/>
                                {
                                    user.followed ?
                                        <Button variant="contained" color="secondary" size="small"
                                                className={`${classes.user}__button`}
                                                onClick={event => handleFollow(event, user.id, user.followed)}>Отписаться</Button>
                                        :
                                        <Button variant="contained" color="secondary" size="small"
                                                className={`${classes.user}__button`}
                                                onClick={event => handleFollow(event, user.id, user.followed)}>Подписаться</Button>
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
    isLoading: state.usersReducer.isLoading
})

const mapDispatchToProps = {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)