interface TypeLoginRequest {
	username: string;
	password: string;
}

interface TypeRegisterRequest extends TypeLoginRequest {
  inviteCode?: number
}

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
  hightwrate = 'hightwrate',
  free = 'free'
}

interface TypeHomeRecommandSessionListRes {
  [SessionType.hot]: TypeSessionItem[],
  [SessionType.hightwrate]: TypeSessionItem[],
  [SessionType.hugebonus]: TypeSessionItem[],
  [SessionType.free]: TypeSessionItem[],
}

interface TypeSessionListRes extends TypePaginatin {
  list: TypeSessionItem[],
  total: number
}

interface TypeGameHistoryRequest extends TypePaginatin {
  status?: number
}

interface TypeGameHistoryItem {
  id: string,
  sessionId: number,
  activityName: string,
  activityBonus: number,
  activitySpend: number,
  activityLimitCount: number,
  openTime: number,
  uids: number,
  status: number,
  createdAt: string,
  statusStr?: string,
  statusClass?: string,
}

interface TypeFreeSpinHistoryItem {
  ID: string,
  createdAt: number,
  type: number,
  amount: number,
}
interface TypeHashTrade {
  id: string,
  type: number,
  amount: number,
  fromAddress: string,
  toAddress: string,
  txHash: string,
  status: number,
  createdAt: number,
  statusStr?: string,
  statusClass?: string,
  remark?: string
}

interface TypeHashTradeRes extends TypePaginatin {
  list: TypeHashTrade[],
  total: number
}
interface TypeFreeSpinHistoryRes extends TypePaginatin {
  list: TypeFreeSpinHistoryItem[],
  total: number
}
interface TypeGameHistoryRes extends TypePaginatin {
  list: TypeGameHistoryItem[],
  total: number
}

interface TypeInviteInfoRes {
	registrations: number
	participates: number
}

type SupportedLanguages = 'id-ID' | 'en-US' | 'zh-CN' | 'ja-JP' | 'ko-KR' | 'th-TH' | 'vi-VN';


interface TypesPlatformConfig {
  finance?: {
    "ercWithdrawFee": number
    "ercDepositMin": number
    "ercWithdrawMin": number
    "trcDepositMin": number
    "trcWithdrawFee": number
    "trcWithdrawMin": number
  },
  invite?: {
    daily: {
      "bonus": number
      "count": number
      "enable": number
      "participants": number
    },
    week: {
      "bonus": number
      "count": number
      "enable": number
      "participants": number
    },
    month: {
      "bonus": number
      "count": number
      "enable": number
      "participants": number
    }
  }
}

interface TypesMakeDraw {
  userName: string
  bonus: number
  count: number
  bonusType: number
}

interface TypesMakeDrawItem {
  bonus: number
  count: number
  bonusType: number
  participants: number
  status: number
  distribute: number
  createdAt: string
  drawId: string
  bonusTypeStr?: string
  statusClass?: string
  statusStr?: string
  totalBonus: number
  userName?: string
}

interface TypeDrawHistoryRes extends TypePaginatin {
  list: TypesMakeDrawItem[],
  total: number
}