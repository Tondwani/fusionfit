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
  getFoodItemsSuccess
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

// Available food categories 
export const FOOD_CATEGORIES = ["veg", "meat", "dairy", "fruit", "bnl", "grains"];

// Food Item Provider Component
export const FoodItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodItemReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  

  const getAuthHeaders = () => ({
    'Authorization': 'Bearer <jwt-token>'
  });
  
  // Get all food items
  const getFoodItems = async() => {
    dispatch(getFoodItemsPending());
    try {
      const response = await instance.get(API_ENDPOINTS.getAllFoodItems, { 
        headers: getAuthHeaders() 
      });
      dispatch(getFoodItemsSuccess(response.data.data, response.data.message));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(getFoodItemsError("Failed to fetch food items"));
      throw error;
    }
  };
  
  // Get food items by category 
  const getFoodItemsByCategory = async(category: string) => {
    dispatch(getFoodItemsByCategoryPending());
    try {
      const response = await instance.get(`${API_ENDPOINTS.getFoodItemsByCategory}/${category}`, { 
        headers: getAuthHeaders() 
      });
      dispatch(getFoodItemsByCategorySuccess(response.data.data, response.data.message));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(getFoodItemsByCategoryError("Failed to fetch food items by category"));
      throw error;
    }
  };
  
  // Create food item 
  const createFoodItem = async(foodItem: ICreateFoodItemPayload) => {
    dispatch(createFoodItemPending());
    try {
      const response = await instance.post(API_ENDPOINTS.createFoodItem, foodItem, { 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        } 
      });
      
      // Create a complete IFoodItem with the response data
      const newFoodItem: IFoodItem = {
        id: response.data.id || new Date().getTime().toString(),
        ...foodItem,
        date: new Date().toISOString()
      };
      
      dispatch(createFoodItemSuccess(newFoodItem, response.data.message || "Created Successfully"));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(createFoodItemError("Failed to create food item"));
      throw error;
    }
  };
  
  // Search food items (Image 4)
  // const searchFoodItems = async(searchTerm: string) => {
  //   dispatch(searchFoodItemsPending());
  //   try {
  //     const response = await instance.get(`${API_ENDPOINTS.searchFoodItems}/${searchTerm}`, { 
  //       headers: getAuthHeaders() 
  //     });
  //     dispatch(searchFoodItemsSuccess(response.data.data, response.data.message));
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(searchFoodItemsError("Failed to search food items"));
  //     throw error;
  //   }
  // };
  
  return (
    <FoodItemStateContext.Provider value={state}>
      <FoodItemActionContext.Provider value={{
        getFoodItems,
        getFoodItemsByCategory,
        createFoodItem,
        // searchFoodItems
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
        headers: { 'Authorization': 'Bearer <jwt-token>' } 
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