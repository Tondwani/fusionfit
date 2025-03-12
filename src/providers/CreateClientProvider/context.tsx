import { createContext } from "react";

export interface IClient {
  id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState: boolean;
  trainerId: string;
}

export interface IClientStateContext {
  clients: IClient[];
  loading: boolean;
  error: string | null;
}

export const INITIAL_STATE: IClientStateContext = {
  clients: [],
  loading: false,
  error: null,
};

export const ClientStateContext = createContext<IClientStateContext>(INITIAL_STATE);
export const ClientActionContext = createContext<any>(null);