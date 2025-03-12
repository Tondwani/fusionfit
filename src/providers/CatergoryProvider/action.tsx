export enum FoodByCategoryActionTypes {
    GET_FOOD_BY_CATEGORY_PENDING = "GET_FOOD_BY_CATEGORY_PENDING",
    GET_FOOD_BY_CATEGORY_SUCCESS = "GET_FOOD_BY_CATEGORY_SUCCESS",
    GET_FOOD_BY_CATEGORY_ERROR = "GET_FOOD_BY_CATEGORY_ERROR",
  }
  
  export const getFoodByCategoryPending = () => ({ type: FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_PENDING });
  export const getFoodByCategorySuccess = (foodItems: any) => ({
    type: FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_SUCCESS,
    payload: foodItems,
  });
  export const getFoodByCategoryError = () => ({ type: FoodByCategoryActionTypes.GET_FOOD_BY_CATEGORY_ERROR });