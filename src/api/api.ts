import { http } from '@/utils/request'

export const login = (data:LoginRequest) => {
    return http.post('/login',data)
}

export const register = (data:RegisterRequest) => {
    return http.post('/register',data)
}