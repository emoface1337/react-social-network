import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@material-ui/lab/Pagination'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

import Loader from '../Loader/Loader'

import User from './User/User'
import { RootState } from '../../ducks'
import { fetchUsers } from '../../ducks/users'
import UsersSearchForm from './UsersSearchForm'

const useStyles = makeStyles(() => ({
    user: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'white',
        alignItems: 'center',
        border: '1px solid white',
        padding: '10px 10px',
        borderRadius: '5px',
        height: '100%',
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
    },
    usersHeader: {
        marginBottom: '25px'
    }
}))

const Users = () => {

    const {
        users,
        pageSize,
        totalUsersCount,
        isLoading,
        isFollowPending
    } = useSelector((state: RootState) => state.users)

    const [currentPageNum, setCurrentPageNum] = useState(1)
    const [filter, setFilter] = useState({
        term: '',
        friend: false
    })

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(fetchUsers(currentPageNum, pageSize, filter))
    }, [currentPageNum, dispatch, pageSize, filter])

    const classes = useStyles()

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const handleChange = (event: React.ChangeEvent<any>, value: number) => {
        setCurrentPageNum(value)
    }

    const handleUsersSearchFormSubmit = (values: { term: string, friend: boolean }) => {
        setCurrentPageNum(1)
        setFilter(prevState => ({ ...prevState, term: values.term, friend: values.friend }))
    }

    return (
        <Box style={{ padding: '20px 20px' }}>
            <Box className={classes.usersHeader}>
                <UsersSearchForm handleSubmit={handleUsersSearchFormSubmit}/>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                {
                    users.length !== 0
                        ? <Pagination variant="outlined" count={pagesCount} page={currentPageNum}
                                      onChange={handleChange}/>
                        : <Typography variant="h6">Не найдено :(</Typography>

                }
            </Box>
            {
                isLoading
                    ? <Loader/>
                    : <Grid container spacing={3}>
                        {
                            users.map((user: { id: string | number }) => (
                                <User user={user} isFollowPending={isFollowPending} classes={classes} key={user.id}/>
                            ))
                        }
                    </Grid>
            }
        </Box>
    )
}

export default Users
