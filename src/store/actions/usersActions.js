import { types } from '../types'

export const followUser = userId => ({
    type: types.users.FOLLOW,
    payload: userId
})

export const unfollowUser = userId => ({
    type: types.users.UNFOLLOW,
    payload: userId
})

export const setUsers = users => ({
    type: types.users.SET_USERS,
    payload: users
})