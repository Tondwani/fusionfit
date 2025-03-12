import { createContext } from "react";

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

export interface IFoodItemState {
  foodItems: IFoodItem[];
  loading: boolean;
  error: string | null;
}

export const INITIAL_STATE: IFoodItemState = {
  foodItems: [],
  loading: false,
  error: null,
};

export const FoodItemStateContext = createContext<IFoodItemState>(INITIAL_STATE);
export const FoodItemActionContext = createContext<any>(null);