
// Enum defining the type of action that can be dispatched

export enum ClientActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_PENDING = "SET_PENDING",
    SET_SUCCESS = "SET_SUCCESS",
    SET_ERROR = "SET_ERROR",
  }
  
  // Interface defining the shape of actions dispatched to the reducer
  export interface IClientAction {
    type: ClientActionType;
    payload?: string | boolean;
  }
  
  // Action creators to simplify dispatching actions
  export const loginAction = (client: string): IClientAction => ({
    type: ClientActionType.LOGIN,
    payload: client,
  });
  
  export const logoutAction = (): IClientAction => ({
    type: ClientActionType.LOGOUT,
  });
  
  export const setPendingAction = (isPending: boolean): IClientAction => ({
    type: ClientActionType.SET_PENDING,
    payload: isPending,
  });
  
  export const setSuccessAction = (isSuccess: boolean): IClientAction => ({
    type: ClientActionType.SET_SUCCESS,
    payload: isSuccess,
  });
  
  export const setErrorAction = (isError: boolean): IClientAction => ({
    type: ClientActionType.SET_ERROR,
    payload: isError, });