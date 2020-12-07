import { instance, ResultCodeEnum } from './api'
import { PhotoType } from './profile'

export type UserType = {
    id: UserIdType
    name: string
    status: string
    photos: PhotoType
    followed: boolean
}

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type SubscribeUserResponseType = {
    data: object,
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const getUsers = (currentPage = 1, pageSize = 12, filter: { term: string, friend: boolean }) => {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`
    + (filter.term !== '' ? `&term=${filter.term}` : '')
    + (filter.friend ? `&friend=true` : ''))
}

export const followUser = (userId: UserIdType) => {
    return instance.post<SubscribeUserResponseType>('follow/' + userId)
}

export const unfollowUser = (userId: UserIdType) => {
    return instance.delete<SubscribeUserResponseType>('follow/' + userId)
}
