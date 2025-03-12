import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, IClientLogin, ClientLoginActionContext, ClientLoginStateContext } from "./context";
import { ClientLoginReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { loginClientPending, loginClientSuccess, loginClientError } from "./action";

export const ClientLoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientLoginReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const loginClient = async (client: IClientLogin) => {
    dispatch(loginClientPending());
    const endpoint = `/api/users/login`;

    try {
      const response = await instance.post(endpoint, client);
      dispatch(loginClientSuccess(response.data.token));
    } catch (error) {
      console.error(error);
      dispatch(loginClientError());
    }
  };

  return (
    <ClientLoginStateContext.Provider value={state}>
      <ClientLoginActionContext.Provider value={{ loginClient }}>
        {children}
      </ClientLoginActionContext.Provider>
    </ClientLoginStateContext.Provider>
  );
};

export const useClientLoginState = () => {
  const context = useContext(ClientLoginStateContext);
  if (!context) {
    throw new Error("useClientLoginState must be used within a ClientLoginProvider");
  }
  return context;
};

export const useClientLoginActions = () => {
  const context = useContext(ClientLoginActionContext);
  if (!context) {
    throw new Error("useClientLoginActions must be used within a ClientLoginProvider");
  }
  return context;
};