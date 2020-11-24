import { instance, ResultCodeEnums } from './api'
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
    resultCode: ResultCodeEnums
    messages: Array<string>
}

export const getUsers = (currentPage = 1, pageSize = 12) => {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
}

export const followUser = (userId: UserIdType) => {
    return instance.post<SubscribeUserResponseType>('follow/' + userId)
}

export const unfollowUser = (userId: UserIdType) => {
    return instance.delete<SubscribeUserResponseType>('follow/' + userId)
}
