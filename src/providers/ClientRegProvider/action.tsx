export enum ClientRegActionEnums {
    REGISTER_CLIENT_PENDING = "REGISTER_CLIENT_PENDING",
    REGISTER_CLIENT_SUCCESS = "REGISTER_CLIENT_SUCCESS",
    REGISTER_CLIENT_ERROR = "REGISTER_CLIENT_ERROR",
  }
  
  export const registerClientPending = () => ({ type: ClientRegActionEnums.REGISTER_CLIENT_PENDING });
  export const registerClientSuccess = (client: any) => ({
    type: ClientRegActionEnums.REGISTER_CLIENT_SUCCESS,
    payload: client,
  });
  export const registerClientError = () => ({ type: ClientRegActionEnums.REGISTER_CLIENT_ERROR });