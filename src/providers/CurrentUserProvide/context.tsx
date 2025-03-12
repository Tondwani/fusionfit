import { createContext } from "react";

export interface ICurrentUser {
    id: string;
    name: string;
    email: string;
    role: string;
    contactNumber: string;
    planType: string;
    activeState: boolean;
    trial: boolean;
    date: string;
  
}

export interface ICurrentUserStateContext {
  currentUser?: ICurrentUser;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface ICurrentUserActionContext {
  getCurrentUser: () => Promise<void>;
}

export const INITIAL_CURRENT_USER_STATE: ICurrentUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const CurrentUserStateContext = createContext<ICurrentUserStateContext>(INITIAL_CURRENT_USER_STATE);
export const CurrentUserActionContext = createContext<ICurrentUserActionContext | undefined>(undefined);
