import { createContext } from "react";

export interface IClientLogin {
  email: string;
  password: string;
}

export interface IClientLoginStateContext {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const INITIAL_STATE: IClientLoginStateContext = {
  token: null,
  loading: false,
  error: null,
};

export const ClientLoginStateContext = createContext<IClientLoginStateContext>(INITIAL_STATE);
export const ClientLoginActionContext = createContext<any>(null);
