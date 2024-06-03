import { IResponse } from './response';

export interface IAuth extends IResponse {
  result: string | TLoginResult | null;
}

export type TLoginResult = {
  accessToken: string;
  token: string;
};

export type TLoginBody = {
  username: string;
  password: string;
};

export interface ILogout extends IResponse {
  result: string | null;
}
