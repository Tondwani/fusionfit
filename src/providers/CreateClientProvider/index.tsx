import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, IClient, ClientActionContext, ClientStateContext } from "./context";
import { ClientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { createClientPending, createClientSuccess, createClientError } from "./action";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const createClient = async (client: IClient) => {
    dispatch(createClientPending());
    const endpoint = `/api/client`;

    try {
      const response = await instance.post(endpoint, client);
      dispatch(createClientSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(createClientError());
    }
  };

  return (
    <ClientStateContext.Provider value={state}>
      <ClientActionContext.Provider value={{ createClient }}>
        {children}
      </ClientActionContext.Provider>
    </ClientStateContext.Provider>
  );
};

export const useClientState = () => {
  const context = useContext(ClientStateContext);
  if (!context) {
    throw new Error("useClientState must be used within a ClientProvider");
  }
  return context;
};

export const useClientActions = () => {
  const context = useContext(ClientActionContext);
  if (!context) {
    throw new Error("useClientActions must be used within a ClientProvider");
  }
  return context;
};