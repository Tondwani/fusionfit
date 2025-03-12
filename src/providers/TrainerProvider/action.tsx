import { ITrainer } from "./context";

// Action Enums
export enum AuthActionEnum {
  // Register Trainer
  registerTrainerPending = "REGISTER_TRAINER_PENDING",
  registerTrainerSuccess = "REGISTER_TRAINER_SUCCESS",
  registerTrainerError = "REGISTER_TRAINER_ERROR",
  
  // Login Trainer
  loginTrainerPending = "LOGIN_TRAINER_PENDING",
  loginTrainerSuccess = "LOGIN_TRAINER_SUCCESS",
  loginTrainerError = "LOGIN_TRAINER_ERROR",
  
  // Get Current User
  getCurrentUserPending = "GET_CURRENT_USER_PENDING",
  getCurrentUserSuccess = "GET_CURRENT_USER_SUCCESS",
  getCurrentUserError = "GET_CURRENT_USER_ERROR",
  
  // Logout
  logout = "LOGOUT"
}

// Register Trainer
export const registerTrainerPending = () => ({
  type: AuthActionEnum.registerTrainerPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const registerTrainerSuccess = (trainer: ITrainer, message: string) => ({
  type: AuthActionEnum.registerTrainerSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    currentUser: trainer,
    message
  }
});

export const registerTrainerError = (message: string = "Registration failed") => ({
  type: AuthActionEnum.registerTrainerError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Login Trainer
export const loginTrainerPending = () => ({
  type: AuthActionEnum.loginTrainerPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const loginTrainerSuccess = (token: string, message: string) => ({
  type: AuthActionEnum.loginTrainerSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    token,
    message
  }
});

export const loginTrainerError = (message: string = "Login failed") => ({
  type: AuthActionEnum.loginTrainerError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Get Current User
export const getCurrentUserPending = () => ({
  type: AuthActionEnum.getCurrentUserPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getCurrentUserSuccess = (trainer: ITrainer, message: string) => ({
  type: AuthActionEnum.getCurrentUserSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    currentUser: trainer,
    message
  }
});

export const getCurrentUserError = (message: string = "Failed to get current user") => ({
  type: AuthActionEnum.getCurrentUserError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Logout
export const logout = () => ({
  type: AuthActionEnum.logout,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: false,
    currentUser: undefined,
    token: undefined
  }
});