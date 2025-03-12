import { ICurrentUser } from "./context";


export enum TrainerActionEnums {
  getCurrentUserPending = "GET_CURRENT_USER_PENDING",
  getCurrentUserSucess = "GET_CURRENT_USER_SUCCESS",
  getCurrentUserError = "GET_CURRENT_USER_ERROR",
}

export const getCurrentUserAction = (currentUser: ICurrentUser) => ({
  type: "GET_CURRENT_USER_SUCCESS" as const,
  payload: currentUser,
});

export const setPendingAction = (isPending: boolean) => ({
  type: "SET_PENDING" as const,
  payload: isPending,
});

export const setSuccessAction = (isSuccess: boolean) => ({
  type: "SET_SUCCESS" as const,
  payload: isSuccess,
});

export const setErrorAction = (isError: boolean) => ({
  type: "SET_ERROR" as const,
  payload: isError,
});
