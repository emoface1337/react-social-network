import { types } from '../types'
import { usersAPI } from '../../api/api'


export const usersActions = {
    setCurrentPage: page => ({
        type: types.users.SET_CURRENT_PAGE,
        payload: page
    }),

    fetchUsers: (currentPage, pageSize) => dispatch => {
        dispatch(setLoading())
        usersAPI.getUsers(currentPage, pageSize).then(({ data }) => dispatch(setUsers(data)))
    },

    followUserThunk: (userId) => dispatch => {
        dispatch(setFollowPending(true, userId))
        usersAPI.followUser(userId)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(followUser(userId))
                    dispatch(setFollowPending(false, userId))
                }
            })
    },

    unfollowUserThunk: (userId) => dispatch => {
        dispatch(setFollowPending(true, userId))
        usersAPI.unfollowUser(userId)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(unfollowUser(userId))
                    dispatch(setFollowPending(false, userId))
                }
            })
    }
}

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