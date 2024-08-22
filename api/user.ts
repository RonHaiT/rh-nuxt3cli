
enum API {
    authLogin = '/auth/oauth/noAuth/token',
}
interface FormState {
    username: string;
    password: string;
    remember: boolean;
    faildTimes: number;
    captchaVerification: string | null;
}
export async function authLogin(params?: FormState, option?: {}) {
    return await useHttp.get<Array<FormState>>(API.authLogin, params, { ...option })
}