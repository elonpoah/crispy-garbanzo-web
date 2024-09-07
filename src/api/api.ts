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

export const getDepositHistory = (data: Paginatin) => {
  return http.get('/deposit_history', data)
}

export const getWithdrawHistory = (data: Paginatin) => {
  return http.get('/withdraw_history', data)
}

export const getHomeRecommand = () => {
  return http.post<HomeRecommandSessionListRes>('/home/data')
}

export const getSessionListByType = (data: SessionList) => {
  return http.post<SessionListRes>('/session/list', data)
}

export const getSessionById = (id: number) => {
  return http.post<SessionItem>('/session/detail', {id})
}

export const buySessionTicket = (id: number) => {
  return http.post<SessionItem>('/session/ticket', {id})
}

export const checkSession = (id: number) => {
  return http.post('/session/check', {id})
}

export const getGameHistory = (data: Paginatin) => {
  return http.post<GameHistoryRes>('/game/history', data)
}

