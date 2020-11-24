import { instance, ResultCodeEnums } from './api'

export type PhotoType = {
    small: string | null
    large: string | null
}

export type GetProfileResponseType = {
    aboutMe: string
    userId: UserIdType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: PhotoType
}

export const getProfile = (userId: UserIdType) => {
    return instance.get<GetProfileResponseType>('profile/' + userId)
}

export const getStatus = (userId: UserIdType) => {
    return instance.get<string>('profile/status/' + userId)
}

type UpdateStatusResponseType = {
    data: object
    resultCode: ResultCodeEnums
    messages: Array<string>
}

export const updateStatus = (newStatus: string) => {
    return instance.put<UpdateStatusResponseType>('profile/status', { status: newStatus })
}

type UpdateUserPhotoResponseType = {
    data: {
        photos: PhotoType
    }
    resultCode: ResultCodeEnums
    messages: Array<string>
}

export const updateUserPhoto = (photo: File) => {
    const formData = new FormData()
    formData.append('image', photo)
    return instance.put<UpdateUserPhotoResponseType>('profile/photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
