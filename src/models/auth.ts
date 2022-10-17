import { AxiosResponse } from "axios";

export namespace AuthTypes {
  export interface Login {
    email: string;
    password: string;
  }

  export interface LoginResponseData {
    code: string;
    content: {
      access_token: string;
      expired: number;
    };
    message: "";
  }

  export interface GetIntrospectResponse {
    user_data: {
      nik: string;
      name: string;
    };
    scope: string[];
  }

  export interface LoginResponse extends AxiosResponse {
    data: LoginResponseData;
  }
}
