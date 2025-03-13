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
      getCurrentUser().catch((error) => {
        console.warn("Could not load user details on init, but token exists:", error);
      });
    }
  }, []);
  
  // Get auth headers function
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  });
  
  // Register trainer - Modified to auto-create minimal user data if needed
  const registerTrainer = async(trainerData: ITrainerRegistrationPayload) => {
    dispatch(registerTrainerPending());
    try {
      const response = await instance.post(API_ENDPOINTS.registerTrainer, trainerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Handle potential response structures
      let trainer: ITrainer;
      let token: string;
      
      if (response.data.data) {
        trainer = response.data.data;
        token = response.data.data.token;
      } else {
        // If there's no structured data, create minimal trainer data
        token = response.data.token;
        trainer = {
          id: response.data.id || `user-${Date.now()}`,
          name: trainerData.name,
          email: trainerData.email,
          role: trainerData.role,
          contactNumber: trainerData.contactNumber,
          birthDate: trainerData.birthDate,
          activeState: true,
          planType: trainerData.planType,
          trial: trainerData.trial,
          policiesAccepted: trainerData.policiesAccepted,
          date: new Date().toISOString()
        };
      }

      // Save token immediately regardless of response structure
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      
      dispatch(registerTrainerSuccess(trainer, response.data.message || "Registration successful"));
      
      // Get current user data after successful registration, but don't fail if this errors
      if (token) {
        try {
          await getCurrentUser();
        } catch (error) {
          console.warn("Could not fetch user details after registration, but registration was successful");
          // Additional fallback: manually update current user in state
          dispatch(getCurrentUserSuccess(trainer, "User data from registration"));
        }
      }
      
      return trainer;
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(registerTrainerError(error.response?.data?.message || "Registration failed"));
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
      
      const token = response.data.data?.token || response.data.token;
      
      // Validate token exists before proceeding
      if (!token) {
        throw new Error("No token received from server");
      }
      
      // Save token to localStorage for future authenticated requests
      localStorage.setItem(TOKEN_KEY, token);
      
      dispatch(loginTrainerSuccess(token, response.data.message || "Login successful"));
      
      // Handle user data if included in login response
      if (response.data.data?.user || response.data.user) {
        const userData = response.data.data?.user || response.data.user;
        dispatch(getCurrentUserSuccess(userData, "User data from login response"));
        return { token, user: userData };
      }
      
      // Try to get current user data, but don't fail if it errors
      try {
        await getCurrentUser();
      } catch (userError) {
        console.warn("Could not fetch user details, but login was successful");
        
        // Create minimal user data from login credentials
        const minimalUser = {
          id: 'unknown-id',
          name: credentials.email.split('@')[0], // Use email username as name
          email: credentials.email,
          role: 'trainer',
          contactNumber: '',
          birthDate: '',
          activeState: true,
          planType: 'basic',
          trial: false,
          policiesAccepted: true,
          date: new Date().toISOString()
        };
        
        dispatch(getCurrentUserSuccess(minimalUser, "Basic user data from login"));
      }
      
      return token;
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginTrainerError(error.response?.data?.message || "Login failed"));
      throw error;
    }
  };
  
  // Get current user 
  const getCurrentUser = async() => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      console.error("No authentication token found in localStorage");
      dispatch(getCurrentUserError("No authentication token found"));
      return null; 
    }
    
    dispatch(getCurrentUserPending());
    try {
      // Debug: Log request attempt
      console.log("Attempting to fetch current user data with token:", token.substring(0, 10) + '...');
      
      const response = await instance.get(API_ENDPOINTS.getCurrentUser, {
        headers: getAuthHeaders()
      });
      
      console.log("Current user API response:", response.data);
      
      const trainer: ITrainer = response.data.data;
      dispatch(getCurrentUserSuccess(trainer, response.data.message || "User data fetched successfully"));
      return trainer;
      
    } catch (error) {
      console.error("Error fetching current user:", error);
      
      // Handle 404/401 errors more gracefully
      if (error.response?.status === 404) {
        console.warn("The getCurrentUser endpoint doesn't exist or returned 404");
        
        // Create minimal user from token if possible
        try {
          // If token exists, create a minimal user rather than failing
          const minimalUser = {
            id: 'token-user',
            name: 'User',
            email: 'user@example.com',
            role: 'trainer',
            contactNumber: '',
            birthDate: '',
            activeState: true,
            planType: 'basic',
            trial: false,
            policiesAccepted: true,
            date: new Date().toISOString()
          };
          
          dispatch(getCurrentUserSuccess(minimalUser, "Using minimal user profile"));
          return minimalUser;
        } catch (tokenError) {
          console.error("Failed to create minimal user:", tokenError);
        }
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        // Don't remove token on auth error - it might be a temporary issue
        console.warn("Authentication error, but not removing token yet");
      }
      
      dispatch(getCurrentUserError(
        error.response?.data?.message || "Failed to get current user"
      ));
      
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