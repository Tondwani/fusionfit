import { useContext, useReducer } from "react";
import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  createFoodItemError,
  createFoodItemPending,
  createFoodItemSuccess,
  getFoodByCategoryError,
  getFoodByCategoryPending,
  getFoodByCategorySuccess,
  getFoodItemsByCategoryError,
  getFoodItemsByCategoryPending,
  getFoodItemsByCategorySuccess,
  getFoodItemsError,
  getFoodItemsPending,
  getFoodItemsSuccess,
  searchFoodItemsError,
  searchFoodItemsPending,
  searchFoodItemsSuccess
} from "./action";
import {
  FoodByCategoryActionContext,
  FoodByCategoryStateContext,
  FoodItemActionContext,
  FoodItemStateContext,
  ICreateFoodItemPayload,
  IFoodItem,
  INITIAL_STATE
} from "./context";
import { FoodByCategoryReducer, FoodItemReducer } from "./reducer";

// API endpoints 
const API_ENDPOINTS = {
  getAllFoodItems: "/api/food",
  getFoodItemsByCategory: "/api/food/category",
  createFoodItem: "/api/foodItems",
  searchFoodItems: "/api/food/search"
};

// Token storage key 
const TOKEN_KEY = "auth_token";

// Available food categories 
export const FOOD_CATEGORIES = ["veg", "meat", "dairy", "fruit", "bnl", "grains"];

// Food Item Provider Component
export const FoodItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodItemReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  
  // Get auth headers function
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  });
  
  // Get all food items
  const getFoodItems = async() => {
    dispatch(getFoodItemsPending());
    try {
      console.log("Fetching all food items...");
      const response = await instance.get(API_ENDPOINTS.getAllFoodItems, { 
        headers: getAuthHeaders() 
      });
      
      console.log("Food items response:", response.data);
      const foodItems = response.data.data || [];
      
      dispatch(getFoodItemsSuccess(foodItems, response.data.message || "Food items fetched successfully"));
      return foodItems;
    } catch (error) {
      console.error("Error fetching food items:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(getFoodItemsError("Authentication error. Please log in again."));
      } else {
        dispatch(getFoodItemsError(error.response?.data?.message || "Failed to fetch food items"));
      }
      
      throw error;
    }
  };
  
  // Get food items by category 
  const getFoodItemsByCategory = async(category: string) => {
    dispatch(getFoodItemsByCategoryPending());
    try {
      console.log(`Fetching ${category} food items...`);
      const response = await instance.get(`${API_ENDPOINTS.getFoodItemsByCategory}/${category}`, { 
        headers: getAuthHeaders() 
      });
      
      console.log(`${category} food items response:`, response.data);
      const foodItems = response.data.data || [];
      
      dispatch(getFoodItemsByCategorySuccess(foodItems, response.data.message || `${category} food items fetched successfully`));
      return foodItems;
    } catch (error) {
      console.error(`Error fetching ${category} food items:`, error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(getFoodItemsByCategoryError("Authentication error. Please log in again."));
      } else {
        dispatch(getFoodItemsByCategoryError(error.response?.data?.message || `Failed to fetch ${category} food items`));
      }
      
      throw error;
    }
  };
  
  // Create food item 
  const createFoodItem = async(foodItem: ICreateFoodItemPayload) => {
    dispatch(createFoodItemPending());
    
    // Get the auth token
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      const errMsg = "Authentication token missing. Please log in again.";
      dispatch(createFoodItemError(errMsg));
      throw new Error(errMsg);
    }
    
    try {
      console.log("Creating food item with data:", foodItem);
      console.log("Using auth headers:", getAuthHeaders());
      
      const response = await instance.post(API_ENDPOINTS.createFoodItem, foodItem, { 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        } 
      });
      
      console.log("Food item creation response:", response.data);
      
      // Extract the ID from various possible response formats
      let foodItemId;
      
      if (response.data && response.data.data && response.data.data.id) {
        foodItemId = response.data.data.id;
      } else if (response.data && response.data.id) {
        foodItemId = response.data.id;
      } else if (response.data && response.data._id) {
        foodItemId = response.data._id;
      } else if (response.data && response.data.data && response.data.data._id) {
        foodItemId = response.data.data._id;
      } else {
        foodItemId = `food-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Create a complete IFoodItem with the response data
      const newFoodItem: IFoodItem = {
        id: foodItemId,
        ...foodItem,
        date: new Date().toISOString()
      };
      
      dispatch(createFoodItemSuccess(newFoodItem, response.data.message || "Food item created successfully"));
      return newFoodItem;
    } catch (error) {
      console.error("Error creating food item:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(createFoodItemError("Authentication error. Please log in again."));
      } else {
        dispatch(createFoodItemError(error.response?.data?.message || "Failed to create food item"));
      }
      
      throw error;
    }
  };
  
  // Search food items
  const searchFoodItems = async(searchTerm: string) => {
    dispatch(searchFoodItemsPending());
    try {
      console.log(`Searching for food items with term: ${searchTerm}`);
      const response = await instance.get(`${API_ENDPOINTS.searchFoodItems}/${searchTerm}`, { 
        headers: getAuthHeaders() 
      });
      
      console.log("Search results:", response.data);
      const foodItems = response.data.data || [];
      
      dispatch(searchFoodItemsSuccess(foodItems, response.data.message || "Search completed"));
      return foodItems;
    } catch (error) {
      console.error("Error searching food items:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(searchFoodItemsError("Authentication error. Please log in again."));
      } else {
        dispatch(searchFoodItemsError(error.response?.data?.message || "Failed to search food items"));
      }
      
      throw error;
    }
  };
  
  return (
    <FoodItemStateContext.Provider value={state}>
      <FoodItemActionContext.Provider value={{
        getFoodItems,
        getFoodItemsByCategory,
        createFoodItem,
        searchFoodItems
      }}>
        {children}
      </FoodItemActionContext.Provider>
    </FoodItemStateContext.Provider>
  );
};

// For backward compatibility
export const FoodByCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodByCategoryReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  
  const getFoodByCategory = async (category: string) => {
    dispatch(getFoodByCategoryPending());
    try {
      const response = await instance.get(`${API_ENDPOINTS.getFoodItemsByCategory}/${category}`, { 
        headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}` } 
      });
      dispatch(getFoodByCategorySuccess(response.data.data, response.data.message));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(getFoodByCategoryError("Failed to fetch food by category"));
      throw error;
    }
  };
  
  return (
    <FoodByCategoryStateContext.Provider value={state}>
      <FoodByCategoryActionContext.Provider value={{ getFoodByCategory }}>
        {children}
      </FoodByCategoryActionContext.Provider>
    </FoodByCategoryStateContext.Provider>
  );
};

// Custom hooks for accessing state and actions
export const useFoodItemState = () => {
  const context = useContext(FoodItemStateContext);
  if (!context) {
    throw new Error('useFoodItemState must be used within a FoodItemProvider');
  }
  return context;
};

export const useFoodItemActions = () => {
  const context = useContext(FoodItemActionContext);
  if (!context) {
    throw new Error('useFoodItemActions must be used within a FoodItemProvider');
  }
  return context;
};

export const useFoodByCategoryState = () => {
  const context = useContext(FoodByCategoryStateContext);
  if (!context) {
    throw new Error('useFoodByCategoryState must be used within a FoodByCategoryProvider');
  }
  return context;
};

export const useFoodByCategoryActions = () => {
  const context = useContext(FoodByCategoryActionContext);
  if (!context) {
    throw new Error('useFoodByCategoryActions must be used within a FoodByCategoryProvider');
  }
  return context;
};