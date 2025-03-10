import { getAxiosInstance } from "@/utils/axiosInstance";
import { INITIAL_CLIENT_STATE, ClientActionContext, ClientStateContext } from "./context";
import { ClientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { loginAction, logoutAction, setPendingAction, setSuccessAction, setErrorAction } from "./actions";
import axios from "axios";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(ClientReducer, INITIAL_CLIENT_STATE);
    const instance = getAxiosInstance();

    const login = async (client: string) => {
        dispatch(setPendingAction(true));
        const endpoint = `api/users/login`;
        await instance.post(endpoint, { client })
            .then((response) => {
                dispatch(loginAction(response.data.client));
                dispatch(setSuccessAction(true));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setErrorAction(true));
            })
            .finally(() => {
                dispatch(setPendingAction(false));
            });
    };

    const logout = async () => {
        dispatch(setPendingAction(true));
        const endpoint = `/client/logout`;
        await axios.post(endpoint)
            .then(() => {
                dispatch(logoutAction());
                dispatch(setSuccessAction(true));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setErrorAction(true));
            })
            .finally(() => {
                dispatch(setPendingAction(false));
            });
    };

    return (
        <ClientStateContext.Provider value={state}>
            <ClientActionContext.Provider value={{ login, logout }}>
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
}