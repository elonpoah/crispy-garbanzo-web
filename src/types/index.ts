interface LoginRequest {
	username: string;
	password: string;
}

interface RegisterRequest extends LoginRequest {
	
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

type SupportedLanguages = 'en-US' | 'zh-CN' | 'pt-BR';