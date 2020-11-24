import { instance, ResultCodeEnums, ResultCodeForCaptcha } from './api'

type isAuthorizedResponseType = {
    data: {
        id: UserIdType
        email: string
        login: string
    }
    resultCode: ResultCodeEnums
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: UserIdType
    },
    resultCode: ResultCodeEnums | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    data: object
    resultCode: ResultCodeEnums
    messages: Array<string>
}

export const isAuthorized = () => {
    return instance.get<isAuthorizedResponseType>('auth/me')
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return instance.post<LoginResponseType>('auth/login', {
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
