import { types } from '../types'
import { usersAPI } from '../../api/api'

const followUser = userId => ({
    type: types.users.FOLLOW,
    payload: userId
})

const unfollowUser = userId => ({
    type: types.users.UNFOLLOW,
    payload: userId
})

const setUsers = data => ({
    type: types.users.SET_USERS,
    payload: data
})

export const setCurrentPage = page => ({
    type: types.users.SET_CURRENT_PAGE,
    payload: page
})

const setLoading = () => ({
    type: types.users.SET_LOADING
})

const setFollowPending = (isPending, userId) => ({
    type: types.users.SET_FOLLOW_PENDING,
    payload: {
        isPending,
        userId
    }
})

export const fetchUsers = (currentPage, pageSize) => dispatch => {
    dispatch(setLoading())
    usersAPI.getUsers(currentPage, pageSize).then(({ data }) => dispatch(setUsers(data)))
}

export const followUserThunk = (userId) => dispatch => {
    dispatch(setFollowPending(true, userId))
    usersAPI.followUser(userId)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(followUser(userId))
                dispatch(setFollowPending(false, userId))
            }
        })
}

export const unfollowUserThunk = (userId) => dispatch => {
    dispatch(setFollowPending(true, userId))
    usersAPI.unfollowUser(userId)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(unfollowUser(userId))
                dispatch(setFollowPending(false, userId))
            }
        })
}