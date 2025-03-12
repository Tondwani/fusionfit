import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientStateContext } from "./context";
import { ClientActionEnum } from "./action";

// Client Reducer
export const ClientReducer = handleActions<IClientStateContext, any>(
  {
    // Register Client
    [ClientActionEnum.registerClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnum.registerClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnum.registerClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Login Client
    [ClientActionEnum.loginClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnum.loginClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnum.loginClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Create Client
    [ClientActionEnum.createClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnum.createClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
      clients: state.clients 
        ? [...state.clients, action.payload.client]
        : [action.payload.client],
    }),
    [ClientActionEnum.createClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);

// API Endpoint Constants
export const API_ENDPOINTS = {
  REGISTER_CLIENT: '/api/users/register/mobile',
  LOGIN_CLIENT: '/api/users/login',
  CREATE_CLIENT: '/api/client'
};