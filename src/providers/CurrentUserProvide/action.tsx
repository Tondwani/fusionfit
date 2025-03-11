import { ICurrentUser } from "./context";

export const getCurrentUserAction = (currentUser: ICurrentUser) => ({
  type: "GET_CURRENT_USER" as const,
  payload: currentUser,
});

export const clearCurrentUserAction = () => ({
  type: "CLEAR_CURRENT_USER" as const,
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
