import { IMealPlan } from "./context";

export enum MealPlanActionEnum {
  // Create meal plan
  createMealPlanPending = "CREATE_MEAL_PLAN_PENDING",
  createMealPlanSuccess = "CREATE_MEAL_PLAN_SUCCESS",
  createMealPlanError = "CREATE_MEAL_PLAN_ERROR",
  
  // Get trainer meal plans
  getTrainerMealplansPending = "GET_TRAINER_MEALPLANS_PENDING",
  getTrainerMealplansSuccess = "GET_TRAINER_MEALPLANS_SUCCESS",
  getTrainerMealplansError = "GET_TRAINER_MEALPLANS_ERROR",
  
  // Get client meal plans
  getClientMealplansPending = "GET_CLIENT_MEALPLANS_PENDING",
  getClientMealplansSuccess = "GET_CLIENT_MEALPLANS_SUCCESS",
  getClientMealplansError = "GET_CLIENT_MEALPLANS_ERROR",
  
  // Get meal plan by id
  getMealplanByIdPending = "GET_MEALPLAN_BY_ID_PENDING",
  getMealplanByIdSuccess = "GET_MEALPLAN_BY_ID_SUCCESS",
  getMealplanByIdError = "GET_MEALPLAN_BY_ID_ERROR"
}

// Create meal plan actions
export const createMealPlanPending = () => ({
  type: MealPlanActionEnum.createMealPlanPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const createMealPlanSuccess = (message: string) => ({
  type: MealPlanActionEnum.createMealPlanSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    message
  }
});

export const createMealPlanError = () => ({
  type: MealPlanActionEnum.createMealPlanError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
  }
});

// Get trainer meal plans actions
export const getTrainerMealplansPending = () => ({
  type: MealPlanActionEnum.getTrainerMealplansPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getTrainerMealplansSuccess = (mealPlans: IMealPlan[], message: string) => ({
  type: MealPlanActionEnum.getTrainerMealplansSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    mealPlans,
    message
  }
});

export const getTrainerMealplansError = () => ({
  type: MealPlanActionEnum.getTrainerMealplansError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
  }
});

// Get client meal plans actions
export const getClientMealplansPending = () => ({
  type: MealPlanActionEnum.getClientMealplansPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getClientMealplansSuccess = (mealPlans: IMealPlan[], message: string) => ({
  type: MealPlanActionEnum.getClientMealplansSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    mealPlans,
    message
  }
});

export const getClientMealplansError = () => ({
  type: MealPlanActionEnum.getClientMealplansError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
  }
});

// Get meal plan by id actions
export const getMealplanByIdPending = () => ({
  type: MealPlanActionEnum.getMealplanByIdPending,
  payload: {
    isPending: true,
    isSuccess: false,
    isError: false,
  }
});

export const getMealplanByIdSuccess = (mealPlan: IMealPlan, message: string) => ({
  type: MealPlanActionEnum.getMealplanByIdSuccess,
  payload: {
    isPending: false,
    isSuccess: true,
    isError: false,
    mealPlan,
    message
  }
});

export const getMealplanByIdError = () => ({
  type: MealPlanActionEnum.getMealplanByIdError,
  payload: {
    isPending: false,
    isSuccess: false,
    isError: true,
  }
});