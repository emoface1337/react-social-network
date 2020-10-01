import { types } from '../types'

export const followUser = userId => ({
    type: types.users.FOLLOW,
    payload: userId
})

export const unfollowUser = userId => ({
    type: types.users.UNFOLLOW,
    payload: userId
})

export const setUsers = data => ({
    type: types.users.SET_USERS,
    payload: data
})

export const setCurrentPage = page => ({
    type: types.users.SET_CURRENT_PAGE,
    payload: page
})

export const setLoading = () => ({
    type: types.users.SET_LOADING
})