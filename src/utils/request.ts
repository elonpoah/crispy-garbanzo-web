import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { showNotify } from 'vant'
import storage from '@/utils/storage'

const instance: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = storage.getItem('token')
        if(token) {
            config.headers['Authorization'] = token
        }
        config.headers['Access-Language'] = storage.getItem('lang') || 'en-US'
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            const cusRes = response.data
            if(cusRes.code !== 0) {
                showNotify({ type: 'danger', teleport: '#app', message: cusRes.msg || '接口异常，稍后重试' });
                return Promise.reject(cusRes)
            }
            return cusRes
        } else {
            showNotify({ type: 'danger', teleport: '#app', message: '服务异常，稍后重试' });
            return Promise.reject(response)
        }
    },
    (error: AxiosError) => {
        // return Promise.reject(error);
        throw new Error("Http Error: " + error)
    }
)

export default instance

export interface Result<T = unknown> {
    msg: string;
    code: number;
    data: T;
    [key: string]: any;
}

export const http = {
    // axios.get('api_url',{params:{}})
    get<T = any>(url: string, params?: object): Promise<Result<T>> {
        return instance.get<T, Result<T>>(url, {params})
    },
    post<T = any>(url:string,data?:object): Promise<Result<T>> {
        return instance.post<T, Result<T>>(url, data);
     },
    put<T = any>(url:string,data?:object): Promise<Result<T>> {
        return instance.put<T,Result<T>>(url, data);
     },
    delete<T =any>(url:string,data?:object): Promise<Result<T>> {
        return instance.delete<T,Result<T>>(url, data);
     },
  };
  