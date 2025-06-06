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

export const getFreeSpinHistory = (data: TypePaginatin) => {
  return http.get<TypeFreeSpinHistoryRes>('/freeSpin/history', data)
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

export const getInviteInfo = (type: number) => {
  return http.post<TypeInviteInfoRes>('/free/inviteInfo', {type})
}

export const startInviteSpin = (type: number) => {
  return http.post('/free/inviteSpin', {type})
}

export const getPlatformSetting = () => {
  return http.get<TypesPlatformConfig>('/platform/setting')
}

export const getDrawHistory = (data: TypePaginatin) => {
  return http.get<TypeDrawHistoryRes>('/draw/history', data)
}

export const makeDraw = (data: TypesMakeDraw) => {
  return http.post('/draw/make', data)
}

export const drawDetail = (id: string) => {
  return http.post<TypesMakeDrawItem>('/draw/detail', {id})
}

export const joinDraw = (id: string) => {
  return http.post('/draw/join', {id})
}
