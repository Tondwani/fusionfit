import { handleActions } from "redux-actions";
import { 
  INITIAL_STATE, 
  IFoodByCategoryStateContext, 
  IFoodItemStateContext 
} from "./context";
import { 
  FoodItemActionEnum,
  FoodByCategoryActionEnum 
} from "./action";

// Food Items Reducer
export const FoodItemReducer = handleActions<IFoodItemStateContext, any>(
  {
    // Get All Food Items
    [FoodItemActionEnum.getFoodItemsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get Food Items By Category
    [FoodItemActionEnum.getFoodItemsByCategoryPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsByCategorySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsByCategoryError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Create Food Item
    [FoodItemActionEnum.createFoodItemPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.createFoodItemSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
      foodItems: state.foodItems 
        ? [...state.foodItems, action.payload.foodItem]
        : [action.payload.foodItem],
    }),
    [FoodItemActionEnum.createFoodItemError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Search Food Items
    [FoodItemActionEnum.searchFoodItemsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.searchFoodItemsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.searchFoodItemsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);

// Food By Category Reducer (for backward compatibility)
export const FoodByCategoryReducer = handleActions<IFoodByCategoryStateContext, any>(
  {
    [FoodByCategoryActionEnum.getFoodByCategoryPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodByCategoryActionEnum.getFoodByCategorySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodByCategoryActionEnum.getFoodByCategoryError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    // Support for the newer action types as well
    [FoodItemActionEnum.getFoodItemsByCategoryPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsByCategorySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodItemActionEnum.getFoodItemsByCategoryError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);

// API Endpoint Constants
export const API_ENDPOINTS = {
  GET_ALL_FOOD_ITEMS: '/api/food',
  GET_FOOD_ITEMS_BY_CATEGORY: '/api/food/category/:category',
  SEARCH_FOOD_ITEMS: '/api/food/search/:search_term',
  CREATE_FOOD_ITEM: '/api/foodItems'
};

// Available Food Categories
export const FOOD_CATEGORIES = ['veg', 'meat', 'dairy', 'fruit', 'bnl', 'grains'];