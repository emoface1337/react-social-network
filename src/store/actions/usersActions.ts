import {
    userActionTypes,
    USERS_FOLLOW,
    USERS_SET_CURRENT_PAGE,
    USERS_SET_FOLLOW_PENDING,
    USERS_SET_LOADING,
    USERS_SET_USERS,
    USERS_UNFOLLOW
} from '../types'
import { usersAPI } from '../../api/api'
import { dispatchType } from '../store'

export const usersActions = {

    setCurrentPage: (page: number): userActionTypes => ({
        type: USERS_SET_CURRENT_PAGE,
        payload: page
    }),

    fetchUsers: (currentPage: number, pageSize: number) => async (dispatch: dispatchType) => {
        dispatch(setLoading())
        const { data } = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data))
    },

    followUserThunk: (userId: number | string) => async (dispatch: dispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.followUser, followUser)
    },

    unfollowUserThunk: (userId: number | string ) => async (dispatch: dispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser, unfollowUser)
    }
}

const followUser = (userId: number | string): userActionTypes => ({
    type: USERS_FOLLOW,
    payload: userId
})

const unfollowUser = (userId: number | string): userActionTypes => ({
    type: USERS_UNFOLLOW,
    payload: userId
})

const setUsers = (data: any): userActionTypes => ({
    type: USERS_SET_USERS,
    payload: data
})

const setLoading = (): userActionTypes => ({
    type: USERS_SET_LOADING
})

const setFollowPending = (isPending: boolean, userId: number | string): userActionTypes => ({
    type: USERS_SET_FOLLOW_PENDING,
    payload: {
        isPending,
        userId
    }
})

const followUnfollowFlow = async (dispatch: dispatchType, userId: number | string, apiMethod: any, actionCreator: any) => {

    dispatch(setFollowPending(true, userId))

    const { data } = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
        dispatch(setFollowPending(false, userId))
    }
}
