import { handleActions } from "redux-actions";
import { IClientStateContext, INITIAL_STATE } from "./context";
import { ClientActionEnums } from "./action";

export const ClientReducer = handleActions<IClientStateContext, any>(
  {
    [ClientActionEnums.CREATE_CLIENT_PENDING]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [ClientActionEnums.CREATE_CLIENT_SUCCESS]: (state, action) => ({
      ...state,
      clients: [...state.clients, action.payload],
      loading: false,
      error: null,
    }),
    [ClientActionEnums.CREATE_CLIENT_ERROR]: (state) => ({
      ...state,
      loading: false,
      error: "Error creating client",
    }),
  },
  INITIAL_STATE
);
