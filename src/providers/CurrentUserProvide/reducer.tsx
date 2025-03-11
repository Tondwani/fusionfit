import { handleActions } from "redux-actions";
import { INITIAL_CURRENT_USER_STATE, ICurrentUserStateContext } from "./context";

export enum CurrentUserActionEnums {
  GET_CURRENT_USER_PENDING = "GET_CURRENT_USER_PENDING",
  GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
  GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

export const currentUserReducer = handleActions<ICurrentUserStateContext, ICurrentUserStateContext>(
  {
    [CurrentUserActionEnums.GET_CURRENT_USER_PENDING]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CurrentUserActionEnums.GET_CURRENT_USER_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CurrentUserActionEnums.GET_CURRENT_USER_ERROR]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CurrentUserActionEnums.CLEAR_CURRENT_USER]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_CURRENT_USER_STATE
);
