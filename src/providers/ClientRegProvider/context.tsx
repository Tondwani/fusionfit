import { createContext } from "react";

export interface IClientRegistration {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
}

export interface IClientRegStateContext {
  clients: IClientRegistration[];
  loading: boolean;
  error: string | null;
}

export const INITIAL_STATE: IClientRegStateContext = {
  clients: [],
  loading: false,
  error: null,
};

export const ClientRegStateContext = createContext<IClientRegStateContext>(INITIAL_STATE);
export const ClientRegActionContext = createContext<any>(null);