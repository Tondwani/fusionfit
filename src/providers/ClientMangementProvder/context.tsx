import { createContext } from "react";

// Client Interface
export interface IClient {
  id: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
  role?: string;
  token?: string;
  trialId?: string;
  birthDate?: string;
  sex?: string;
  fullName?: string;
  date?: string;
}

// Registration Payload Interface
export interface IClientRegistrationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
}

// Login Payload Interface
export interface IClientLoginPayload {
  email: string;
  password: string;
}

// Create Client Payload Interface
export interface ICreateClientPayload {
  fullName: string;
  email: string;
  contactNumber: string;
  sex: string;
  birthDate: string;
  trialerId: string;
  
}

// State Interface
export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  client?: IClient;
  clients?: IClient[];
  token?: string;
  message?: string;
}

// Initial State
export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Actions Interface
export interface IClientActionContext {
  registerClient: (client: IClientRegistrationPayload) => Promise<IClient>;
  loginClient: (credentials: IClientLoginPayload) => Promise<string>;
  createClient: (client: ICreateClientPayload) => Promise<IClient>;
}

// Context for Client State
export const ClientStateContext = createContext<IClientStateContext>(INITIAL_STATE);

// Context for Client Actions
export const ClientActionContext = createContext<IClientActionContext | undefined>(undefined);

// API Configuration
export const API_CONFIG = {
  endpoints: {
    register: "/api/users/register/mobile",
    login: "/api/users/login",
    createClient: "/api/client",
  },
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <jwt-token>",
  },
};

// Response Interface
export interface IApiResponse {
  status: number;
  message: string;
  data?: any;
}