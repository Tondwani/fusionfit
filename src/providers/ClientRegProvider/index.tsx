import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, IClientRegistration, ClientRegActionContext, ClientRegStateContext } from "./context";
import { ClientRegReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { registerClientPending, registerClientSuccess, registerClientError } from "./action";

export const ClientRegProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientRegReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const registerClient = async (client: IClientRegistration) => {
    dispatch(registerClientPending());
    const endpoint = `/api/users/register/mobile`;

    try {
      const response = await instance.post(endpoint, client);
      dispatch(registerClientSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(registerClientError());
    }
  };

  return (
    <ClientRegStateContext.Provider value={state}>
      <ClientRegActionContext.Provider value={{ registerClient }}>
        {children}
      </ClientRegActionContext.Provider>
    </ClientRegStateContext.Provider>
  );
};

export const useClientRegState = () => {
  const context = useContext(ClientRegStateContext);
  if (!context) {
    throw new Error("useClientRegState must be used within a ClientRegProvider");
  }
  return context;
};

export const useClientRegActions = () => {
  const context = useContext(ClientRegActionContext);
  if (!context) {
    throw new Error("useClientRegActions must be used within a ClientRegProvider");
  }
  return context;
}