enum API {
    getCaptcha = '/auth/captcha/get',
    checkCaptcha = '/auth/captcha/check',
}
interface UserListParams {
    email: string
    age: string
    id: number
}

export async function getCaptcha(params?: UserListParams, option?: {}) {
    return await useHttp.get<Array<UserListParams>>(API.getCaptcha, params, { ...option })
}
export async function checkCaptcha(params?: UserListParams, option?: {}) {
    return await useHttp.post<Array<UserListParams>>(API.checkCaptcha, params, { ...option })
}