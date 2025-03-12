import { handleActions } from "redux-actions";
import { IClientLoginStateContext, INITIAL_STATE } from "./context";
import { ClientLoginActionEnums } from "./action";

export const ClientLoginReducer = handleActions<IClientLoginStateContext, any>(
  {
    [ClientLoginActionEnums.LOGIN_CLIENT_PENDING]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [ClientLoginActionEnums.LOGIN_CLIENT_SUCCESS]: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    [ClientLoginActionEnums.LOGIN_CLIENT_ERROR]: (state) => ({
      ...state,
      loading: false,
      error: "Login failed. Please check your credentials.",
    }),
  },
  INITIAL_STATE
);