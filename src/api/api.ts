import { http } from '@/utils/request'

export const login = (data:LoginRequest) => {
    return http.post('/login',data)
}

export const register = (data:RegisterRequest) => {
    return http.post('/register',data)
}

export const changePassword = (data:ChangepwdRequest) => {
  return http.post('/change_password',data)
}

export const getUserInfo = () => {
  return http.get('/user_info')
}