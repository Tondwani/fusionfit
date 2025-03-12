import { handleActions } from "redux-actions";
import { IFoodItemState, INITIAL_STATE } from "./context";
import { FoodItemActionTypes } from "./action";

export const FoodItemReducer = handleActions<IFoodItemState, any>(
  {
    [FoodItemActionTypes.GET_FOOD_ITEMS_PENDING]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [FoodItemActionTypes.GET_FOOD_ITEMS_SUCCESS]: (state, action) => ({
      ...state,
      foodItems: action.payload,
      loading: false,
      error: null,
    }),
    [FoodItemActionTypes.GET_FOOD_ITEMS_ERROR]: (state) => ({
      ...state,
      loading: false,
      error: "Failed to fetch food items.",
    }),
  },
  INITIAL_STATE
);
