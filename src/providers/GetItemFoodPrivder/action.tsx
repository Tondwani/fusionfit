export enum FoodItemActionTypes {
    GET_FOOD_ITEMS_PENDING = "GET_FOOD_ITEMS_PENDING",
    GET_FOOD_ITEMS_SUCCESS = "GET_FOOD_ITEMS_SUCCESS",
    GET_FOOD_ITEMS_ERROR = "GET_FOOD_ITEMS_ERROR",
  }
  
  export const getFoodItemsPending = () => ({ type: FoodItemActionTypes.GET_FOOD_ITEMS_PENDING });
  export const getFoodItemsSuccess = (foodItems: any) => ({
    type: FoodItemActionTypes.GET_FOOD_ITEMS_SUCCESS,
    payload: foodItems,
  });
  export const getFoodItemsError = () => ({ type: FoodItemActionTypes.GET_FOOD_ITEMS_ERROR });