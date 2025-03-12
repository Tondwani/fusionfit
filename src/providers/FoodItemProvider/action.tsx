import { IFoodItem } from "./context";

// Action Enums
export enum FoodItemActionEnum {
  // Get All Food Items
  getFoodItemsPending = "GET_FOOD_ITEMS_PENDING",
  getFoodItemsSuccess = "GET_FOOD_ITEMS_SUCCESS",
  getFoodItemsError = "GET_FOOD_ITEMS_ERROR",
  
  // Get Food Items By Category
  getFoodItemsByCategoryPending = "GET_FOOD_ITEMS_BY_CATEGORY_PENDING",
  getFoodItemsByCategorySuccess = "GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS",
  getFoodItemsByCategoryError = "GET_FOOD_ITEMS_BY_CATEGORY_ERROR",
  
  // Create Food Item
  createFoodItemPending = "CREATE_FOOD_ITEM_PENDING",
  createFoodItemSuccess = "CREATE_FOOD_ITEM_SUCCESS",
  createFoodItemError = "CREATE_FOOD_ITEM_ERROR",
  
  // Search Food Items
  searchFoodItemsPending = "SEARCH_FOOD_ITEMS_PENDING",
  searchFoodItemsSuccess = "SEARCH_FOOD_ITEMS_SUCCESS",
  searchFoodItemsError = "SEARCH_FOOD_ITEMS_ERROR"
}

// Get All Food Items
export const getFoodItemsPending = () => ({
  type: FoodItemActionEnum.getFoodItemsPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getFoodItemsSuccess = (foodItems: IFoodItem[], message: string) => ({
  type: FoodItemActionEnum.getFoodItemsSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
    message
  }
});

export const getFoodItemsError = (message: string = "Failed to fetch food items") => ({
  type: FoodItemActionEnum.getFoodItemsError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Get Food Items By Category
export const getFoodItemsByCategoryPending = () => ({
  type: FoodItemActionEnum.getFoodItemsByCategoryPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getFoodItemsByCategorySuccess = (foodItems: IFoodItem[], message: string) => ({
  type: FoodItemActionEnum.getFoodItemsByCategorySuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
    message
  }
});

export const getFoodItemsByCategoryError = (message: string = "Failed to fetch food items by category") => ({
  type: FoodItemActionEnum.getFoodItemsByCategoryError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Create Food Item
export const createFoodItemPending = () => ({
  type: FoodItemActionEnum.createFoodItemPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const createFoodItemSuccess = (foodItem: IFoodItem, message: string = "Created Successfully") => ({
  type: FoodItemActionEnum.createFoodItemSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItem,
    message
  }
});

export const createFoodItemError = (message: string = "Failed to create food item") => ({
  type: FoodItemActionEnum.createFoodItemError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// Search Food Items
export const searchFoodItemsPending = () => ({
  type: FoodItemActionEnum.searchFoodItemsPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const searchFoodItemsSuccess = (foodItems: IFoodItem[], message: string = "Search completed") => ({
  type: FoodItemActionEnum.searchFoodItemsSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
    message
  }
});

export const searchFoodItemsError = (message: string = "Failed to search food items") => ({
  type: FoodItemActionEnum.searchFoodItemsError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});

// For backward compatibility
export enum FoodByCategoryActionEnum {
  getFoodByCategoryPending = "GET_FOOD_BY_CATEGORY_PENDING",
  getFoodByCategorySuccess = "GET_FOOD_BY_CATEGORY_SUCCESS",
  getFoodByCategoryError = "GET_FOOD_BY_CATEGORY_ERROR",
}

export const getFoodByCategoryPending = () => ({
  type: FoodByCategoryActionEnum.getFoodByCategoryPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getFoodByCategorySuccess = (foodItems: IFoodItem[], message: string) => ({
  type: FoodByCategoryActionEnum.getFoodByCategorySuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
    message
  }
});

export const getFoodByCategoryError = (message: string = "Failed to fetch food by category") => ({
  type: FoodByCategoryActionEnum.getFoodByCategoryError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  }
});