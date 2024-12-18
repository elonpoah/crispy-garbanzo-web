import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { showNotify } from 'vant'
import storage from '@/utils/storage'
import useUserStore from '@/stores/user'

const utf8ToBase64 = (str:string) => {
  const utf8Bytes = new TextEncoder().encode(str);
  return btoa(String.fromCharCode(...utf8Bytes));
}

const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'object' && !Array.isArray(value) ? removeEmptyValues(value) : value;
      return acc;
    }, {} as Record<string, any>);
};

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

        // filter params 和 data
        if (config.params) {
          config.params = removeEmptyValues(config.params);
        }
        if (config.data) {
          config.data = removeEmptyValues(config.data);
        }

        const params = JSON.stringify(config.params || config.data || {});
        const requestID = utf8ToBase64(`${config.url || ""}_${config.method || "GET"}_${params}`);
        config.headers["X-Request-ID"] = requestID;
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
                showNotify({ type: 'danger', teleport: '#app', message: cusRes.msg || 'Err, Try latter' });
                if(cusRes.code === 401) {
                  const userStore = useUserStore()
                  userStore.loginOut()
                }
                return Promise.reject(cusRes)
            }
            return cusRes
        } else {
          showNotify({ type: 'danger', teleport: '#app', message: response.data.msg || '' });
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
  