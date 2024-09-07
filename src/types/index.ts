interface LoginRequest {
	username: string;
	password: string;
}

interface RegisterRequest extends LoginRequest {}

interface Paginatin {
  page: number;
  pageSize: number;
}

interface ChangepwdRequest {
  password: string;
  newPassword: string;
}

interface UserInfo {
  uid: number;
  userName: string;
  nickName: string;
  phone: string;
  email: string;
  balance: number;
  freezeBalance: number;
}

interface SessionList {
  page: number;
  pageSize: number;
  type: number;
}

interface SessionItem {
  id: number;
  uids: number;
  activityLimitCount: number;
  activityBonus: number;
  openTime: number ;
  activitySpend: number ;
}

interface HomeRecommandSessionList {
  category: SessionType,
  label: string,
  icon: string,
  className: string,
  path: string,
  list: SessionItem[]
}

enum SessionType {
  hot = 'hot',
  hugebonus = 'hugebonus',
  hightwrate = 'hightwrate'
}

interface HomeRecommandSessionListRes {
  [SessionType.hot]: SessionItem[],
  [SessionType.hightwrate]: SessionItem[],
  [SessionType.hugebonus]: SessionItem[]
}

interface SessionListRes extends Paginatin {
  list: SessionItem[],
  total: number
}

interface GameHistoryItem {
  "id": string,
  "sessionId": number,
  "activityName": string,
  "activityBonus": number,
  "activitySpend": number,
  "activityLimitCount": number,
  "openTime": number,
  "uids": number,
  "status": number,
  "createdAt": string,
}

interface GameHistoryRes extends Paginatin {
  list: GameHistoryItem[],
  total: number
}

type SupportedLanguages = 'en-US' | 'zh-CN' | 'pt-BR';