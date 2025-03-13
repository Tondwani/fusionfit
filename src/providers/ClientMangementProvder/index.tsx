import { useContext, useReducer } from "react";
import { getAxiosInstance } from "../../utils/axiosInstance";
import { 
  INITIAL_STATE, 
  ClientStateContext, 
  ClientActionContext,
  IClientActionContext,
  IClient,
  IClientRegistrationPayload,
  IClientLoginPayload,
  ICreateClientPayload
} from "./context";
import { ClientReducer } from "./reducer";
import { 
  registerClientPending, 
  registerClientSuccess, 
  registerClientError,
  loginClientPending,
  loginClientSuccess,
  loginClientError,
  createClientPending,
  createClientSuccess,
  createClientError
} from "./action";

// API endpoints 
const API_ENDPOINTS = {
  registerClient: "/api/users/register/mobile",
  loginClient: "/api/users/login",
  createClient: "/api/client"
};

// Token storage key (use the same key as auth provider)
const TOKEN_KEY = "auth_token";

// Client Provider Component
export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  
  
  // Get auth headers function
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  });
  
  // Register client 
  const registerClient = async(clientData: IClientRegistrationPayload) => {
    dispatch(registerClientPending());
    try {
      const response = await instance.post(API_ENDPOINTS.registerClient, clientData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const client: IClient = response.data.data;
      dispatch(registerClientSuccess(client, response.data.message));
      return client;
      
    } catch (error) {
      console.error("Client registration error:", error);
      dispatch(registerClientError(error.response?.data?.message || "Registration failed"));
      throw error;
    }
  };
  
  // Login client 
  const loginClient = async(credentials: IClientLoginPayload) => {
    dispatch(loginClientPending());
    try {
      const response = await instance.post(API_ENDPOINTS.loginClient, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Handle different response formats
      const token = response.data.data?.token || response.data.token;
      
      if (!token) {
        throw new Error("No token received from server");
      }
      
      // Save token to localStorage
      localStorage.setItem(TOKEN_KEY, token);
      
      dispatch(loginClientSuccess(token, response.data.message || "Login successful"));
      
      return token;
    } catch (error) {
      console.error("Client login error:", error);
      dispatch(loginClientError(error.response?.data?.message || "Login failed"));
      throw error;
    }
  };
  
  // Create client 
  const createClient = async(clientData: ICreateClientPayload) => {
    dispatch(createClientPending());
    
    // Get the auth token
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      const errMsg = "Authentication token missing. Please log in again.";
      dispatch(createClientError(errMsg));
      throw new Error(errMsg);
    }
    
    try {
      console.log("Creating client with data:", clientData);
      console.log("Using auth headers:", getAuthHeaders());
      
      const response = await instance.post(API_ENDPOINTS.createClient, clientData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Client creation response:", response.data);
      
      // Create a complete IClient object with the response data
      const newClient: IClient = {
        id: response.data.data?.id || response.data.id || new Date().getTime().toString(),
        name: clientData.fullName,
        email: clientData.email,
        contactNumber: clientData.contactNumber,
        dateOfBirth: clientData.birthDate,
        policiesAccepted: true,
        sex: clientData.sex,
        fullName: clientData.fullName,
        birthDate: clientData.birthDate,
        trialId: clientData.trialerId,
        date: new Date().toISOString()
      };
      
      dispatch(createClientSuccess(newClient, response.data.message || "Created Successfully"));
      return newClient;
      
    } catch (error) {
      console.error("Client creation error:", error);
      
      // Check for specific error types
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(createClientError("Authentication error. Please log in again."));
      } else {
        dispatch(createClientError(error.response?.data?.message || "Failed to create client"));
      }
      
      throw error;
    }
  };
  
  // Create an object that matches IClientActionContext interface
  const actionContextValue: IClientActionContext = {
    registerClient,
    loginClient,
    createClient
  };

  return (
    <ClientStateContext.Provider value={state}>
      <ClientActionContext.Provider value={actionContextValue}>
        {children}
      </ClientActionContext.Provider>
    </ClientStateContext.Provider>
  );
};

// Custom hooks for accessing state and actions
export const useClientState = () => {
  const context = useContext(ClientStateContext);
  if (!context) {
    throw new Error('useClientState must be used within a ClientProvider');
  }
  return context;
};

export const useClientActions = () => {
  const context = useContext(ClientActionContext);
  if (!context) {
    throw new Error('useClientActions must be used within a ClientProvider');
  }
  return context;
};

// Export a simple utility function to check if a user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};