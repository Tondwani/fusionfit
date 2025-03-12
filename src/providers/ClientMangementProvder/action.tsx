import { IClient } from "./context";

// Action Enums
export enum ClientActionEnum {
  // Register Client
  registerClientPending = "REGISTER_CLIENT_PENDING",
  registerClientSuccess = "REGISTER_CLIENT_SUCCESS",
  registerClientError = "REGISTER_CLIENT_ERROR",
  
  // Login Client
  loginClientPending = "LOGIN_CLIENT_PENDING",
  loginClientSuccess = "LOGIN_CLIENT_SUCCESS",
  loginClientError = "LOGIN_CLIENT_ERROR",
  
  // Create Client
  createClientPending = "CREATE_CLIENT_PENDING",
  createClientSuccess = "CREATE_CLIENT_SUCCESS",
  createClientError = "CREATE_CLIENT_ERROR",
}

// Register Client
export const registerClientPending = () => ({
  type: ClientActionEnum.registerClientPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const registerClientSuccess = (client: IClient, message: string) => ({
  type: ClientActionEnum.registerClientSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
    message
  }
});

export const registerClientError = (message: string = "Registration failed") => ({
  type: ClientActionEnum.registerClientError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Login Client
export const loginClientPending = () => ({
  type: ClientActionEnum.loginClientPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const loginClientSuccess = (token: string, message: string) => ({
  type: ClientActionEnum.loginClientSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    token,
    message
  }
});

export const loginClientError = (message: string = "Login failed") => ({
  type: ClientActionEnum.loginClientError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Create Client
export const createClientPending = () => ({
  type: ClientActionEnum.createClientPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const createClientSuccess = (client: IClient, message: string = "Created Successfully") => ({
  type: ClientActionEnum.createClientSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
    message
  }
});

export const createClientError = (message: string = "Failed to create client") => ({
  type: ClientActionEnum.createClientError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});