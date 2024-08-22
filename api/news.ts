// import type { UseFetchOptions } from '#app'
// interface ResOptions<T> {
//     data: T
//     code: number
//     success: boolean
//     detail?: string
// }
// type HttpOption<T> = UseFetchOptions<ResOptions<T>, T, KeysOf<T>>
// import type { KeysOf, PickFrom } from '#app/composables/asyncData'
enum API {
    userList = '/user',
}
interface UserListParams {
    email: string
    age: string
    id: number
}

export async function getUserList(params?: UserListParams, option?: {}) {
    return await useHttp.get<Array<UserListParams>>(API.userList, params, { ...option })
}