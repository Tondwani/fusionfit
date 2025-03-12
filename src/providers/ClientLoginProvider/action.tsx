export enum ClientLoginActionEnums {
    LOGIN_CLIENT_PENDING = "LOGIN_CLIENT_PENDING",
    LOGIN_CLIENT_SUCCESS = "LOGIN_CLIENT_SUCCESS",
    LOGIN_CLIENT_ERROR = "LOGIN_CLIENT_ERROR",
  }
  
  export const loginClientPending = () => ({ type: ClientLoginActionEnums.LOGIN_CLIENT_PENDING });
  export const loginClientSuccess = (token: string) => ({
    type: ClientLoginActionEnums.LOGIN_CLIENT_SUCCESS,
    payload: token,
  });
  export const loginClientError = () => ({ type: ClientLoginActionEnums.LOGIN_CLIENT_ERROR });