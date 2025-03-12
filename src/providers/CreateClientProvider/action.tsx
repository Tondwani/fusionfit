export enum ClientActionEnums {
    CREATE_CLIENT_PENDING = "CREATE_CLIENT_PENDING",
    CREATE_CLIENT_SUCCESS = "CREATE_CLIENT_SUCCESS",
    CREATE_CLIENT_ERROR = "CREATE_CLIENT_ERROR",
  }
  
  export const createClientPending = () => ({ type: ClientActionEnums.CREATE_CLIENT_PENDING });
  export const createClientSuccess = (client: any) => ({
    type: ClientActionEnums.CREATE_CLIENT_SUCCESS,
    payload: client,
  });
  export const createClientError = () => ({ type: ClientActionEnums.CREATE_CLIENT_ERROR });