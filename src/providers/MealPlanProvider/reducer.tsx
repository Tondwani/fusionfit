import { handleActions } from "redux-actions";
import { INITIAL_STATE, IMealPlanStateContext } from "./context";
import { MealPlanActionEnum } from "./action";

export const MealPlanReducer = handleActions<IMealPlanStateContext, IMealPlanStateContext>(
  {
    // Create meal plan handlers
    [MealPlanActionEnum.createMealPlanPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.createMealPlanSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.createMealPlanError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    // Get trainer meal plans handlers
    [MealPlanActionEnum.getTrainerMealplansPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getTrainerMealplansSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getTrainerMealplansError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    // Get client meal plans handlers
    [MealPlanActionEnum.getClientMealplansPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getClientMealplansSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getClientMealplansError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    // Get meal plan by id handlers
    [MealPlanActionEnum.getMealplanByIdPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getMealplanByIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealPlanActionEnum.getMealplanByIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);