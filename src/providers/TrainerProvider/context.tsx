import { createContext } from "react";

// Trainer Interface
export interface ITrainer {
  id: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  contactNumber: string;
  birthDate: string;
  activeState: boolean;
  planType: string;
  trial: boolean;
  policiesAccepted: boolean;
  date: string;
}

// Registration Payload Interface
export interface ITrainerRegistrationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  contactNumber: string;
  birthDate: string;
  planType: string;
  activeState: boolean;
  trial: boolean;
  policiesAccepted: boolean;
}

// Login Payload Interface
export interface ITrainerLoginPayload {
  email: string;
  password: string;
}

// State Interface
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentUser?: ITrainer;
  token?: string;
  message?: string;
}

// Initial State
export const INITIAL_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Actions Interface
export interface IAuthActionContext {
  registerTrainer: (trainer: ITrainerRegistrationPayload) => Promise<any>;
  loginTrainer: (credentials: ITrainerLoginPayload) => Promise<any>;
  getCurrentUser: () => Promise<any>;
  logout: () => void;
}

// Context for Auth State
export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

// Context for Auth Actions
export const AuthActionContext = createContext<IAuthActionContext | undefined>(undefined);

// API Configuration
export const API_CONFIG = {
  endpoints: {
    register: "/api/users/register",
    login: "/api/users/login",
    currentUser: "/api/users/current",
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