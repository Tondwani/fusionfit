import { createContext } from "react";

// Interface for meal item
export interface IMealItem {
  name: string;
  quantity: string;
  unit: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  note: string | null;
}

// Interface for meal totals
export interface IMealTotals {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

// Interface for a meal
export interface IMeal {
  id?: string;
  name: string;
  mealType: string;
  clientNotes?: string[];
  items: IMealItem[];
  itemTotals: IMealTotals;
}

// Interface for a complete meal plan
export interface IMealPlan {
  id?: string;
  name: string;
  clientId: string;
  trainerId: string;
  clientName: string;
  description: string;
  notes?: string[];
  clientNotes?: string[];
  meals: IMeal[];
  mealTotals: IMealTotals;
  isBase: boolean;
}

// Interface for the meal plan state context
export interface IMealPlanStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  mealPlan?: IMealPlan;
  mealPlans?: IMealPlan[];
  message?: string;
}

// Initial state object
export const INITIAL_STATE: IMealPlanStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Interface for the meal plan action context
export interface IMealPlanActionContext {
  createMealPlan: (mealPlan: IMealPlan) => Promise<void>;
  getTrainerMealplans: (trainerId: string) => Promise<void>;
  getClientMealplans: (clientId: string) => Promise<void>;
  getMealplanById: (planId: string) => Promise<void>;
}

// Create contexts
export const MealPlanStateContext = createContext<IMealPlanStateContext>(INITIAL_STATE);
export const MealPlanActionContext = createContext<IMealPlanActionContext | undefined>(undefined);