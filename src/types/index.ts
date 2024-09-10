interface TypeLoginRequest {
	username: string;
	password: string;
}

interface TypeRegisterRequest extends TypeLoginRequest {}

interface TypePaginatin {
  page: number;
  pageSize: number;
}

interface TypeChangepwdRequest {
  password: string;
  newPassword: string;
}

interface TypeUserDeposit {
  userName: string;
  type: number;
  amount: number;
}

interface TypeUserWithdraw {
  userName: string;
  type: number;
  amount: number;
  address: string;
}

interface TypeUserInfo {
  uid: number;
  userName: string;
  nickName: string;
  phone: string;
  email: string;
  balance: number;
  freezeBalance: number;
}

interface TypeUserSummary {
	sessionCount: number;
	freeCount:    number
}

interface TypeNetworkType {
  text: string;
  value: number;
}

interface TypeSessionList {
  page: number;
  pageSize: number;
  type: number;
}

interface TypeSessionItem {
  id: number;
  uids: number;
  activityLimitCount: number;
  activityBonus: number;
  openTime: number ;
  activitySpend: number ;
}

interface TypeHomeRecommandSessionList {
  category: SessionType,
  label: string,
  icon: string,
  className: string,
  path: string,
  list: TypeSessionItem[]
}

enum SessionType {
  hot = 'hot',
  hugebonus = 'hugebonus',
  hightwrate = 'hightwrate'
}

interface TypeHomeRecommandSessionListRes {
  [SessionType.hot]: TypeSessionItem[],
  [SessionType.hightwrate]: TypeSessionItem[],
  [SessionType.hugebonus]: TypeSessionItem[]
}

interface TypeSessionListRes extends TypePaginatin {
  list: TypeSessionItem[],
  total: number
}

interface TypeGameHistoryRequest extends TypePaginatin {
  status?: number
}

interface TypeGameHistoryItem {
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

interface TypeGameHistoryRes extends TypePaginatin {
  list: TypeGameHistoryItem[],
  total: number
}

type SupportedLanguages = 'en-US' | 'zh-CN' | 'pt-BR';