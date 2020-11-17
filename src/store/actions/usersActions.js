import { types } from '../types'
import { usersAPI } from '../../api/api'


export const usersActions = {
    
    setCurrentPage: page => ({
        type: types.users.SET_CURRENT_PAGE,
        payload: page
    }),

    fetchUsers: (currentPage, pageSize) => async dispatch => {
        dispatch(setLoading())
        const { data } = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data))
    },

    followUserThunk: userId => async dispatch => {
        await followUnfollowFlow(dispatch, userId, usersAPI.followUser, followUser)
    },

    unfollowUserThunk: userId => async dispatch => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser, unfollowUser)
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

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(setFollowPending(true, userId))

    const { data } = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
        dispatch(setFollowPending(false, userId))
    }
}
