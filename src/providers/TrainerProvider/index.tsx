"use client";
import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, ITrainer, TrainerActionContext, TrainerStateContext } from "./context";
import { TrainerReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  registerTrainerPending,
  registerTrainerSuccess,
  registerTrainerError,
  loginTrainerPending,
  loginTrainerSuccess,
  loginTrainerError,
} from "./actions";

export const TrainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TrainerReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const registerTrainer = async (trainer: ITrainer) => {
    dispatch(registerTrainerPending());
    const endpoint = "/api/users/register"; // Adjust to match API

    try {
      const response = await instance.post(endpoint, trainer);
      dispatch(registerTrainerSuccess(response.data));
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(registerTrainerError());
    }
  };

  const loginTrainer = async (email: string, password: string) => {
    dispatch(loginTrainerPending());
    const endpoint = "/api/users/login"; // Adjust to match API

    try {
      const response = await instance.post(endpoint, { email, password });
      dispatch(loginTrainerSuccess(response.data));
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginTrainerError());
    }
  };

  return (
    <TrainerStateContext.Provider value={state}>
      <TrainerActionContext.Provider value={{ registerTrainer, loginTrainer }}>
        {children}
      </TrainerActionContext.Provider>
    </TrainerStateContext.Provider>
  );
};

export const useTrainerState = () => {
  const context = useContext(TrainerStateContext);
  if (!context) {
    throw new Error("useTrainerState must be used within a TrainerProvider");
  }
  return context;
};

export const useTrainerActions = () => {
  const context = useContext(TrainerActionContext);
  if (!context) {
    throw new Error("useTrainerActions must be used within a TrainerProvider");
  }
  return context;
};