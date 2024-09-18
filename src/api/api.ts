import { http } from '@/utils/request'

export const login = (data:TypeLoginRequest) => {
    return http.post('/login',data)
}

export const register = (data:TypeRegisterRequest) => {
    return http.post('/register',data)
}

export const changePassword = (data:TypeChangepwdRequest) => {
  return http.post('/change/password',data)
}

export const getUserInfo = () => {
  return http.get('/user/info')
}

export const userDeposit = (data: TypeUserDeposit) => {
  return http.post('/user/deposit', data)
}

export const userWithdraw = (data: TypeUserWithdraw) => {
  return http.post('/user/withdraw', data)
}

export const getDepositHistory = (data: TypePaginatin) => {
  return http.get<TypeHashTradeRes>('/deposit/history', data)
}

export const getWithdrawHistory = (data: TypePaginatin) => {
  return http.get<TypeHashTradeRes>('/withdraw/history', data)
}

export const getHomeRecommand = () => {
  return http.post<TypeHomeRecommandSessionListRes>('/home/data')
}

export const getSessionListByType = (data: TypeSessionList) => {
  return http.post<TypeSessionListRes>('/session/list', data)
}

export const getSessionById = (id: number) => {
  return http.post<TypeSessionItem>('/session/detail', {id})
}

export const buySessionTicket = (id: number) => {
  return http.post<TypeSessionItem>('/session/ticket', {id})
}

export const checkSession = (id: number) => {
  return http.post('/session/check', {id})
}

export const getGameHistory = (data: TypeGameHistoryRequest) => {
  return http.post<TypeGameHistoryRes>('/game/history', data)
}

export const getSessionSummary = () => {
  return http.get<TypeUserSummary>('session/summary')
}


