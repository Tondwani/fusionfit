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
      getCurrentUser().catch(() => {
        console.warn("Could not load user details on init, but token exists");
      });
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
      const token = response.data.data.token; // Make sure your API returns a token on registration

      // Save token immediately on successful registration
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      }
      
      dispatch(registerTrainerSuccess(trainer, response.data.message));
      
      // Get current user data after successful registration
      if (token) {
        try {
          await getCurrentUser();
        } catch (error) {
          console.warn("Could not fetch user details after registration, but registration was successful");
        }
      }
      
      return trainer;
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(registerTrainerError(error.response?.data?.message || "Registration failed"));
      throw error;
    }
  };
  
  // Login trainer with improved error handling
  const loginTrainer = async(credentials: ITrainerLoginPayload) => {
    dispatch(loginTrainerPending());
    try {
      const response = await instance.post(API_ENDPOINTS.loginTrainer, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const token = response.data.data.token;
      const userData = response.data.data.user; // Check if user data is included in login response
      
      // Validate token exists before proceeding
      if (!token) {
        throw new Error("No token received from server");
      }
      
      // Save token to localStorage for future authenticated requests
      localStorage.setItem(TOKEN_KEY, token);
      
      dispatch(loginTrainerSuccess(token, response.data.message));
      
      // If the login response already includes user data, use it directly
      if (userData) {
        dispatch(getCurrentUserSuccess(userData, "User data from login response"));
        return { token, user: userData };
      }
      
      // Only call getCurrentUser if we don't have user data yet
      try {
        await getCurrentUser();
      } catch (userError) {
        console.warn("Could not fetch user details, but login was successful");
        
        // Try to extract basic user info from token if it's a JWT
        try {
          const base64Url = token.split('.')[1];
          if (base64Url) {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const tokenData = JSON.parse(window.atob(base64));
            
            if (tokenData.user || tokenData.name || tokenData.email) {
              // Create minimal user object from token data
              const minimalUser = {
                id: tokenData.sub || tokenData.id || 'unknown',
                name: tokenData.name || tokenData.user?.name || credentials.email.split('@')[0] || 'User',
                email: tokenData.email || credentials.email,
                role: tokenData.role || tokenData.user?.role || 'trainer',
                // Set default values for required fields
                contactNumber: tokenData.contactNumber || '',
                birthDate: tokenData.birthDate || '',
                activeState: true,
                planType: tokenData.planType || 'basic',
                trial: false,
                policiesAccepted: true,
                date: new Date().toISOString()
              };
              
              dispatch(getCurrentUserSuccess(minimalUser, "Basic user data extracted from token"));
            }
          }
        } catch (tokenError) {
          console.warn("Could not extract user data from token:", tokenError);
        }
      }
      
      return token;
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginTrainerError(error.response?.data?.message || "Login failed"));
      throw error;
    }
  };
  
  // Get current user with improved error handling
  const getCurrentUser = async() => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      console.error("No authentication token found in localStorage");
      dispatch(getCurrentUserError("No authentication token found"));
      return null; 
    }
    
    dispatch(getCurrentUserPending());
    try {
      console.log("Attempting to access endpoint:", API_ENDPOINTS.getCurrentUser);
      
      const response = await instance.get(API_ENDPOINTS.getCurrentUser, {
        headers: getAuthHeaders()
      });
      
      const trainer: ITrainer = response.data.data;
      
      // Validate trainer data
      if (!trainer || !trainer.id) {
        throw new Error("Invalid user data received from server");
      }
      
      dispatch(getCurrentUserSuccess(trainer, response.data.message));
      return trainer;
      
    } catch (error) {
      console.error("Error fetching current user:", error);
      
      // Try to recover by extracting user data from JWT token if endpoint doesn't exist
      if (error.response?.status === 404) {
        try {
          // If you have JWT token, you could try to decode it to get basic user info
          const base64Url = token.split('.')[1];
          if (base64Url) {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const tokenData = JSON.parse(window.atob(base64));
            
            if (tokenData.user || tokenData.name || tokenData.email) {
              // Create minimal user object from token data
              const minimalUser = {
                id: tokenData.sub || tokenData.id || 'unknown',
                name: tokenData.name || tokenData.user?.name || 'User',
                email: tokenData.email || tokenData.user?.email || 'user@example.com',
                role: tokenData.role || tokenData.user?.role || 'trainer',
                // Set default values for required fields
                contactNumber: tokenData.contactNumber || '',
                birthDate: tokenData.birthDate || '',
                activeState: true,
                planType: tokenData.planType || 'basic',
                trial: false,
                policiesAccepted: true,
                date: new Date().toISOString()
              };
              
              dispatch(getCurrentUserSuccess(minimalUser, "User data extracted from token"));
              return minimalUser;
            }
          }
        } catch (tokenError) {
          console.error("Failed to extract user data from token:", tokenError);
        }
      }
      
      // If we couldn't recover, proceed with normal error handling
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem(TOKEN_KEY);
        dispatch(logout());
      } else {
        dispatch(getCurrentUserError(
          error.response?.data?.message || "Failed to get current user"
        ));
      }
      
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