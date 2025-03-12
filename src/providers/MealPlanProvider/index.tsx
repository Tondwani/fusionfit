import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, MealPlanStateContext, MealPlanActionContext, IMealPlan } from "./context";
import { MealPlanReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { 
  createMealPlanPending, 
  createMealPlanSuccess, 
  createMealPlanError,
  getTrainerMealplansPending,
  getTrainerMealplansSuccess,
  getTrainerMealplansError,
  getClientMealplansPending,
  getClientMealplansSuccess,
  getClientMealplansError,
  getMealplanByIdPending,
  getMealplanByIdSuccess,
  getMealplanByIdError
} from "./action";

export const MealPlanProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(MealPlanReducer, INITIAL_STATE);
    const instance = getAxiosInstance();
    
    // Create a new meal plan
    const createMealPlan = async(mealPlan: IMealPlan) => {
        dispatch(createMealPlanPending());
        const endpoint = `/api/mealplan`;
        
        // Set authorization header according to the specification
        const headers = {
            'Authorization': 'Bearer <jwt-token>'
        };
        
        try {
            const response = await instance.post(endpoint, mealPlan, { headers });
            dispatch(createMealPlanSuccess(response.data.message));
            return response.data;
        } catch (error) {
            console.error(error);
            dispatch(createMealPlanError());
            throw error;
        }
    };
    
    // Get meal plans for a specific trainer
    const getTrainerMealplans = async(trainerId: string) => {
        dispatch(getTrainerMealplansPending());
        const endpoint = `/api/mealplan/trainer/${trainerId}`;
        
        // Set authorization header according to the specification
        const headers = {
            'Authorization': 'Bearer <jwt-token>'
        };
        
        try {
            const response = await instance.get(endpoint, { headers });
            dispatch(getTrainerMealplansSuccess(response.data.data, response.data.message));
            return response.data;
        } catch (error) {
            console.error(error);
            dispatch(getTrainerMealplansError());
            throw error;
        }
    };
    
    // Get meal plans for a specific client
    const getClientMealplans = async(clientId: string) => {
        dispatch(getClientMealplansPending());
        const endpoint = `/api/mealplan/client/${clientId}`;
        
        // Set authorization header according to the specification
        const headers = {
            'Authorization': 'Bearer <jwt-token>'
        };
        
        try {
            const response = await instance.get(endpoint, { headers });
            dispatch(getClientMealplansSuccess(response.data.data, response.data.message));
            return response.data;
        } catch (error) {
            console.error(error);
            dispatch(getClientMealplansError());
            throw error;
        }
    };
    
    // Get a specific meal plan by ID
    const getMealplanById = async(planId: string) => {
        dispatch(getMealplanByIdPending());
        const endpoint = `/api/mealplan/${planId}`;
        
        // Set authorization header according to the specification
        const headers = {
            'Authorization': 'Bearer <jwt-token>'
        };
        
        try {
            const response = await instance.get(endpoint, { headers });
            dispatch(getMealplanByIdSuccess(response.data.data, response.data.message));
            return response.data;
        } catch (error) {
            console.error(error);
            dispatch(getMealplanByIdError());
            throw error;
        }
    };
    
    return(
        <MealPlanStateContext.Provider value={state}>
            <MealPlanActionContext.Provider value={{
                createMealPlan,
                getTrainerMealplans,
                getClientMealplans,
                getMealplanById
            }}>
                {children}
            </MealPlanActionContext.Provider>
        </MealPlanStateContext.Provider>
    );
};

export const useMealPlanState = () => {
    const context = useContext(MealPlanStateContext);
    if (!context) {
        throw new Error('useMealPlanState must be used within a MealPlanProvider');
    }
    return context;
};

export const useMealPlanActions = () => {
    const context = useContext(MealPlanActionContext);
    if (!context) {
        throw new Error('useMealPlanActions must be used within a MealPlanProvider');
    }
    return context;
};