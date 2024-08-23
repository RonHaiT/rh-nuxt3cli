
enum API {
    authLogin = '/auth/oauth/noAuth/token',
}

interface FormState {
    clientId: string;
    tokenType: string;
    secret: string;
    account: string;
    pwd: string;
    captchaVerification: string | null
}
interface UserInfo {
    "nickname": string
    "head": null | string
}
interface UserData {
    "accessToken": string
    "refreshToken": string
    "expiresIn": string
    "faildTimes": null | string
    "userInfo": UserInfo
}
interface ResOptions {
    data: UserData
    msg: string
    status: number
}
export async function authLogin(params: FormState, option?: {}) {
    return await useHttp.post<ResOptions>(API.authLogin, params, { ...option })
}
