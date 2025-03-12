import { handleActions } from "redux-actions";
import { INITIAL_CURRENT_USER_STATE, ICurrentUserStateContext } from "./context";

export enum CurrentUserActionEnums {
  GET_CURRENT_USER_PENDING = "GET_CURRENT_USER_PENDING",
  GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
  GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  SET_PENDING = "SET_PENDING",
  SET_SUCCESS = "SET_SUCCESS",
  SET_ERROR = "SET_ERROR",
}

export const currentUserReducer = handleActions<ICurrentUserStateContext, any>(
  {
    [CurrentUserActionEnums.GET_CURRENT_USER_PENDING]: (state, action) => ({
      ...state,
      isPending: action.payload,
    }),
    [CurrentUserActionEnums.GET_CURRENT_USER_SUCCESS]: (state, action) => ({
      ...state,
      currentUser: action.payload,
      isSuccess: true,
    }),
    [CurrentUserActionEnums.GET_CURRENT_USER_ERROR]: (state, action) => ({
      ...state,
      isError: action.payload,
    }),
    [CurrentUserActionEnums.CLEAR_CURRENT_USER]: (state) => ({
      ...state,
      currentUser: undefined,
    }),
    [CurrentUserActionEnums.SET_PENDING]: (state, action) => ({
      ...state,
      isPending: action.payload,
    }),
    [CurrentUserActionEnums.SET_SUCCESS]: (state, action) => ({
      ...state,
      isSuccess: action.payload,
    }),
    [CurrentUserActionEnums.SET_ERROR]: (state, action) => ({
      ...state,
      isError: action.payload,
    }),
  },
  INITIAL_CURRENT_USER_STATE
);