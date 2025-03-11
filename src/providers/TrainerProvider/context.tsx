
import { createContext } from "react";

// Interface defining the shape of a Trainer object
export interface ITrainer {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  contactNumber: string;
  PlanType: string
  activeState: boolean;
  trial: boolean;
  policiesAccepted: boolean;
}

// Interface defining the state shape for our Trainer context
export interface ITrainerStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  trainer?: ITrainer;
}

// Interface defining all actions that can be performed
export interface ITrainerActionContext {
  registerTrainer: (trainer: ITrainer) => void;
  loginTrainer: (email: string, password: string) => void;
}

// Initial state object
export const INITIAL_STATE: ITrainerStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const TrainerStateContext =
  createContext<ITrainerStateContext>(INITIAL_STATE);

export const TrainerActionContext =
  createContext<ITrainerActionContext>(undefined);

  // export const TrainerActionContext =
  // createContext<ITrainerActionContext>({registerTrainer:() => {},
  // });
