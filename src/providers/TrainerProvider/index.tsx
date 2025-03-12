import { useContext, useReducer, useEffect } from "react";
import { getAxiosInstance } from "../../utils/axiosInstance";
import { 
  INITIAL_STATE, 
  AuthStateContext, 
  AuthActionContext,
  IAuthActionContext,
  ITrainer,
  ITrainerRegistrationPayload,
  ITrainerLoginPayload
} from "./context";
import { AuthReducer } from "./reducer";
import { 
  registerTrainerPending, 
  registerTrainerSuccess, 
  registerTrainerError,
  loginTrainerPending,
  loginTrainerSuccess,
  loginTrainerError,
  getCurrentUserPending,
  getCurrentUserSuccess,
  getCurrentUserError,
  logout
} from "./action";

// API endpoints
const API_ENDPOINTS = {
  registerTrainer: "/api/users/register",
  loginTrainer: "/api/users/login",
  getCurrentUser: "/api/users/current"
};

// Token storage key
const TOKEN_KEY = "auth_token";

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  
  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // If token exists, try to get current user data
      getCurrentUser();
    }
  }, []);
  
  // Get auth headers function
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  });
  
  // Register trainer 
  const registerTrainer = async(trainerData: ITrainerRegistrationPayload) => {
    dispatch(registerTrainerPending());
    try {
      const response = await instance.post(API_ENDPOINTS.registerTrainer, trainerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const trainer: ITrainer = response.data.data;
      dispatch(registerTrainerSuccess(trainer, response.data.message));
     
    } catch (error) {
      console.error(error);
      dispatch(registerTrainerError("Registration failed"));
      throw error;
    }
  };
  
  // Login trainer 
  const loginTrainer = async(credentials: ITrainerLoginPayload) => {
    dispatch(loginTrainerPending());
    try {
      const response = await instance.post(API_ENDPOINTS.loginTrainer, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const token = response.data.data.token;
      dispatch(loginTrainerSuccess(token, response.data.message));
      // Save token to localStorage for future authenticated requests
      localStorage.setItem(TOKEN_KEY, token);
      
      // After successful login, fetch current user data
      await getCurrentUser();
      
      return token;
    } catch (error) {
      console.error(error);
      dispatch(loginTrainerError("Login failed"));
      throw error;
    }
  };
  
  // Get current user 
  const getCurrentUser = async() => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    console.log("Token exists:", !!token);
    
    if (!token) {
      console.error("Debug: No authentication token found in localStorage");
      dispatch(getCurrentUserError("No authentication token found"));
      return; 
    }
    
    dispatch(getCurrentUserPending());
    try {
      // Debug: Log request attempt
      console.log("Attempting to fetch current user data");
      console.log("Auth headers:", getAuthHeaders());
      
      const response = await instance.get(API_ENDPOINTS.getCurrentUser, {
        headers: getAuthHeaders()
      });
      
      // Debug: Log successful response
      console.log("Current user API response:", response.data);
      
      const trainer: ITrainer = response.data.data;
      dispatch(getCurrentUserSuccess(trainer, response.data.message));
      
      // Debug: Log successful trainer data
      console.log("Successfully fetched trainer data:", trainer);
      
    } catch (error) {
      // Enhanced error logging
      console.error("Error fetching current user:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
      
      dispatch(getCurrentUserError(
        error.response?.data?.message || "Failed to get current user"
      ));
      
      // Log token before removal
      console.warn("Removing potentially invalid token from localStorage");
      
      // If we can't get the current user, the token might be invalid
      localStorage.removeItem(TOKEN_KEY);
      throw error;
    }
  };
  
  // Logout function
  const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(logout());
  };
  
  // Create an object that matches IAuthActionContext interface
  const actionContextValue: IAuthActionContext = {
    registerTrainer,
    loginTrainer,
    getCurrentUser,
    logout: logoutUser
  };
  
  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={actionContextValue}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Custom hooks for accessing state and actions
export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error('useAuthActions must be used within an AuthProvider');
  }
  return context;
};

// Export utility functions for auth status
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};