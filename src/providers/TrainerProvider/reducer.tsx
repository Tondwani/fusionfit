import { handleActions } from "redux-actions";
import { INITIAL_STATE, ITrainerStateContext } from "./context";
import { TrainerActionEnums } from "./actions";

export const TrainerReducer = handleActions<ITrainerStateContext, ITrainerStateContext>(
  {
    [TrainerActionEnums.REGISTER_PENDING]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.REGISTER_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.REGISTER_ERROR]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.LOGIN_PENDING]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.LOGIN_ERROR]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);