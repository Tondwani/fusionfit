import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnum } from "./action";

// Auth Reducer
export const AuthReducer = handleActions<IAuthStateContext, any>(
  {
    // Register Trainer
    [AuthActionEnum.registerTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.registerTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.registerTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Login Trainer
    [AuthActionEnum.loginTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.loginTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.loginTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get Current User
    [AuthActionEnum.getCurrentUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.getCurrentUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnum.getCurrentUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    // Logout
    [AuthActionEnum.logout]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);

// API Endpoint Constants
export const API_ENDPOINTS = {
  REGISTER_TRAINER: '/api/users/register',
  LOGIN_TRAINER: '/api/users/login',
  CURRENT_USER: '/api/users/current'
};