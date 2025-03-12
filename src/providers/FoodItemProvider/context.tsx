import { createContext } from "react";

// Food Item Interface
export interface IFoodItem {
  id: string;
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
  date: string;
}

// Create Food Item Request Payload Interface
export interface ICreateFoodItemPayload {
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
}

// State Interface
export interface IFoodItemStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  foodItems?: IFoodItem[];
  message?: string;
}

// Initial State
export const INITIAL_STATE: IFoodItemStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Actions Interface
export interface IFoodItemActionContext {
  getFoodItems: () => Promise<void>;
  getFoodItemsByCategory: (category: string) => Promise<void>;
  createFoodItem: (foodItem: ICreateFoodItemPayload) => Promise<void>;
}

// Context for Food Item State
export const FoodItemStateContext = createContext<IFoodItemStateContext>(INITIAL_STATE);

// Context for Food Item Actions
export const FoodItemActionContext = createContext<IFoodItemActionContext | undefined>(undefined);

// Food By Category State Interface (keeping for backward compatibility)
export interface IFoodByCategoryStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  foodItems?: IFoodItem[];
  message?: string;
}

// Food By Category Actions Interface
export interface IFoodByCategoryActionContext {
  getFoodByCategory: (category: string) => Promise<void>;
}

// Context for Food By Category State
export const FoodByCategoryStateContext = createContext<IFoodByCategoryStateContext>(INITIAL_STATE);

// Context for Food By Category Actions
export const FoodByCategoryActionContext = createContext<IFoodByCategoryActionContext | undefined>(undefined);

// API Configuration
export const API_CONFIG = {
  endpoints: {
    foodItems: "/api/foodItems",
  },
  headers: {
    "Authorization": "Bearer <jwt-token>",
    "Content-Type": "application/json",
  },
};

// Response Interface
export interface IApiResponse {
  status: number;
  message: string;
}