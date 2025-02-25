export type RespCustomType = {
  status: number;
  message: string;
  data: any;
};

export type RespUserCreatedOrLogin = { 
  id: number;
  name: string;
  email: string;
  access_token: string;
  expires_in: number;
  token_type: string;
};