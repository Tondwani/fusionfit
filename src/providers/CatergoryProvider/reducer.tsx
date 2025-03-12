import { handleActions } from "redux-actions";
import { IFoodItemState, INITIAL_STATE } from "./context";
import { FoodByCategoryActionTypes } from "./action";

export const FoodByCategoryReducer = handleActions<IFoodItemState, any>(
  {
    [FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_PENDING]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      foodItems: action.payload,
      loading: false,
      error: null,
    }),
    [FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_ERROR]: (state) => ({
      ...state,
      loading: false,
      error: "Failed to fetch food items by category.",
    }),
  },
  INITIAL_STATE
);