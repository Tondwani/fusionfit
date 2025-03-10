"use client";

// import * as reduxActions from "redux-actions";
// import { ITrainer, ITrainerStateContext } from "./context";


export enum TrainerActionEnums {
    REGISTER_PENDING = "REGISTER_PENDING",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_ERROR = "REGISTER_ERROR",
    LOGIN_PENDING = "LOGIN_PENDING",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",
  }
  
  // Action creators
  export const registerTrainerPending = () => ({
    type: TrainerActionEnums.REGISTER_PENDING,
    payload: { isPending: true, isSuccess: false, isError: false },
  });
  
  export const registerTrainerSuccess = (trainer) => ({
    type: TrainerActionEnums.REGISTER_SUCCESS,
    payload: { isPending: false, isSuccess: true, isError: false, trainer },
  });
  
  export const registerTrainerError = () => ({
    type: TrainerActionEnums.REGISTER_ERROR,
    payload: { isPending: false, isSuccess: false, isError: true },
  });
  
  export const loginTrainerPending = () => ({
    type: TrainerActionEnums.LOGIN_PENDING,
    payload: { isPending: true, isSuccess: false, isError: false },
  });
  
  export const loginTrainerSuccess = (trainer) => ({
    type: TrainerActionEnums.LOGIN_SUCCESS,
    payload: { isPending: false, isSuccess: true, isError: false, trainer },
  });
  
  export const loginTrainerError = () => ({
    type: TrainerActionEnums.LOGIN_ERROR,
    payload: { isPending: false, isSuccess: false, isError: true },
  });