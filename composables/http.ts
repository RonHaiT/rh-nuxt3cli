import type { FetchError, FetchResponse, SearchParameters } from 'ofetch'
import { hash } from 'ohash'
import type { AsyncData, UseFetchOptions } from '#app'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

type HttpOption<T> = UseFetchOptions<ResOptions<T>, T, KeysOf<T>>
interface ResOptions<T> {
    data: T
    msg: string
    status: number
}

function handleError<T>(
    _method: string | undefined,
    _response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>,
) {
    const { status, data, msg } = _response._data || {};
    console.error(`Error in ${_method}: ${msg} (Status: ${status})`);
}

function checkRef(obj: Record<string, any>) {
    return Object.keys(obj).some(key => isRef(obj[key]))
}

function fetch<T>(url: UrlType, opts: HttpOption<T>): AsyncData<ResOptions<T>, FetchError<ResOptions<T>> | null> {
    const { key, params, watch } = opts
    // 如果 `params` 或 `watch` 中存在 `ref` 类型，并且 `key` 没有设置，抛出错误
    if (!key && ((params && checkRef(params)) || (watch && checkRef(watch))))
        console.error('\x1B[31m%s\x1B[0m %s', '[useHttp] [error]', 'The `key` option is required when `params` or `watch` has ref properties, please set a unique key for the current request.')

    const options = opts as UseFetchOptions<ResOptions<T>>
    options.lazy = options.lazy ?? true

    const { baseURL } = useRuntimeConfig().public

    return useFetch<ResOptions<T>>(url, {

        onRequest({ options }) {
            options.baseURL = baseURL as string
            const { $i18n } = useNuxtApp()
            const locale = $i18n.locale.value
            options.headers = new Headers(options.headers)
            options.headers.set('Content-Language', locale)
            options.headers.set('Authorization', '...')

            console.log('options', options)
        },
        onResponse(_context) {

        },
        onResponseError({ response, options: { method } }) {
            handleError<T>(method, response)
        },
        key: key ?? hash(['api-fetch', url, JSON.stringify(options)]),

        ...options,
        // PickFrom<T, KeysOf<T>>
    }) as AsyncData<ResOptions<T>, FetchError<ResOptions<T>> | null>
}

export const useHttp = {
    get: <T>(url: UrlType, params?: SearchParameters, option?: HttpOption<T>) => {
        return fetch<T>(url, { method: 'get', params, ...option })
    },

    post: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
        return fetch<T>(url, { method: 'post', body, ...option })
    },

    put: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
        return fetch<T>(url, { method: 'put', body, ...option })
    },

    delete: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
        return fetch<T>(url, { method: 'delete', body, ...option })
    },
}