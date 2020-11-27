import { instance, ResultCodeEnum, ResultCodeForCaptchaEnum } from './api'

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

type isAuthorizedResponseDataType = {
    id: UserIdType
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: UserIdType
}

type LogoutResponseType = {
    data: object
    resultCode: ResultCodeEnum
}

export const isAuthorized = () => {
    return instance.get<ResponseType<isAuthorizedResponseDataType>>('auth/me')
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', {
        email,
        password,
        rememberMe,
        captcha
    })
}

export const logout = () => {
    return instance.delete<LogoutResponseType>('auth/login')
}

type GetCaptchaResponseType = {
    url: string
}

export const getCaptchaUrl = () => {
    return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
}
