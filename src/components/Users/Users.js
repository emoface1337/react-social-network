import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../utils'

import { usersActions } from '../../store/actions'

import Pagination from '@material-ui/lab/Pagination'
import { Box, Grid, makeStyles } from '@material-ui/core'

import Loader from '../Loader/Loader'

import {
    getCurrentPage,
    getIsFollowPending,
    getLoadingStatus,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../utils/selectors'

import User from './User/User'

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

const { fetchUsers, setCurrentPage } = usersActions

const Users = () => {

    const users = useSelector(state => getUsers(state))
    const pageSize = useSelector(state => getPageSize(state))
    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    const currentPage = useSelector(state => getCurrentPage(state))
    const isLoading = useSelector(state => getLoadingStatus(state))
    const isFollowPending = useSelector(state => getIsFollowPending(state))

    const dispatch = useDispatch()

    useEffect(() => {
        return setTitle('Пользователи')
    }, [])

    useLayoutEffect(() => {
        dispatch(fetchUsers(currentPage, pageSize))
    }, [currentPage, dispatch, pageSize])

    const classes = useStyles()

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const [pageNum, setPageNumState] = React.useState(1)
    const handleChange = (event, value) => {
        setPageNumState(value)
        dispatch(setCurrentPage(value))
    }

    if (isLoading)
        return <Loader/>

    return (
        <Box style={{ padding: '20px 20px' }}>
            <Box className={classes.usersPagination}>
                <Pagination variant="outlined" count={pagesCount} page={pageNum} onChange={handleChange}/>
            </Box>
            <Grid container spacing={3}>
                {
                    users.map(user => (
                        <User user={user} isFollowPending={isFollowPending} classes={classes} key={user.id}/>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Users
