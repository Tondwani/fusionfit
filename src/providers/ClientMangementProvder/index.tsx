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

// Client Provider Component
export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  
  // Get auth headers function
  const getAuthHeaders = () => ({
    'Authorization': 'Bearer <jwt-token>'
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
      
    } catch (error) {
      console.error(error);
      dispatch(registerClientError("Registration failed"));
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
      
      const token = response.data.data.token;
      dispatch(loginClientSuccess(token, response.data.message));
      // Save token to localStorage or sessionStorage for future authenticated requests
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      console.error(error);
      dispatch(loginClientError("Login failed"));
      throw error;
    }
  };
  
  // Create client 
  const createClient = async(clientData: ICreateClientPayload) => {
    dispatch(createClientPending());
    try {
      const response = await instance.post(API_ENDPOINTS.createClient, clientData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      });
      
      // Create a complete IClient object with the response data
      const newClient: IClient = {
        id: response.data.id || new Date().getTime().toString(),
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
    } catch (error) {
      console.error(error);
      dispatch(createClientError("Failed to create client"));
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
  return !!localStorage.getItem('token');
};




