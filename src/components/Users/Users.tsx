import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../utils'

import Pagination from '@material-ui/lab/Pagination'
import { Box, Grid, makeStyles } from '@material-ui/core'

import Loader from '../Loader/Loader'

import User from './User/User'
import { RootState } from '../../ducks'
import { fetchUsers } from '../../ducks/users'

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

const Users = () => {
    const [pageNum, setPageNumState] = useState(1)

    const { users, pageSize, totalUsersCount, isLoading, isFollowPending } = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch()

    useEffect((): () => void => setTitle('Пользователи'), [])

    useLayoutEffect(() => {
        dispatch(fetchUsers(pageNum, pageSize))
    }, [pageNum, dispatch, pageSize])

    const classes = useStyles()

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const handleChange = (event: React.ChangeEvent<any>, value: number) => {
        setPageNumState(value)
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
                    users.map((user: { id: string | number | null | undefined }) => (
                        <User user={user} isFollowPending={isFollowPending} classes={classes} key={user.id}/>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Users
