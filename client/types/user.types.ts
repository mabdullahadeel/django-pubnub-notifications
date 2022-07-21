export interface User {
  id: string;
  pn_uuid_key: string;
  last_login: Date;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  email: string;
}

export interface MeResponse {
  pn_token: {
    exp_timestamp: number;
    token: string;
    ttl: number;
  };
  user: User;
}

export interface UserLoginPaylod {
  username: string;
  password: string;
}
export interface UserRegisterPaylod extends UserLoginPaylod {
  email: string;
}
