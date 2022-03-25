export interface Signup {
  name: string;
  surnames: string;
  nick: string;
  dni: string;
  email: string;
  password: string;
  pasword_confirmation: string;
}

export interface Login {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface RespLogin {
  access_token: string;
  token_type: string;
  expires_at: string;
}

export interface Auth {
  id: number;
  nick: string;
  name: string;
  surnames: string;
  dni: string;
  avatar: string;
  email: string;
  erased: boolean;
  wallet: any;
  products:any;
}

export interface AuthShort {
  id?: number,
  nick: string,
  avatar: string,
}
