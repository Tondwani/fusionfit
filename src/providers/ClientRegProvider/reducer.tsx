import { handleActions } from "redux-actions";
import { IClientRegStateContext, INITIAL_STATE } from "./context";
import { ClientRegActionEnums } from "./action";

export const ClientRegReducer = handleActions<IClientRegStateContext, any>(
  {
    [ClientRegActionEnums.REGISTER_CLIENT_PENDING]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [ClientRegActionEnums.REGISTER_CLIENT_SUCCESS]: (state, action) => ({
      ...state,
      clients: [...state.clients, action.payload],
      loading: false,
      error: null,
    }),
    [ClientRegActionEnums.REGISTER_CLIENT_ERROR]: (state) => ({
      ...state,
      loading: false,
      error: "Error registering client",
    }),
  },
  INITIAL_STATE
);
