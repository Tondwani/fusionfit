"use client";
import { useContext, useReducer } from "react";
import { CurrentUserActionContext, CurrentUserStateContext, INITIAL_CURRENT_USER_STATE } from "./context";
import { currentUserReducer } from "./reducer";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { getCurrentUserAction, clearCurrentUserAction, setPendingAction, setSuccessAction, setErrorAction } from "./action";

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(currentUserReducer, INITIAL_CURRENT_USER_STATE);
    const instance = getAxiosInstance();

    const getCurrentUser = async () => {
        dispatch(setPendingAction(true));
        const endpoint = `api/user/current`;
        await instance.get(endpoint)
            .then((response) => {
                dispatch(getCurrentUserAction(response.data.currentUser));
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

    const clearCurrentUser = () => {
        dispatch(clearCurrentUserAction());
    };

    return (
        <CurrentUserStateContext.Provider value={state}>
            <CurrentUserActionContext.Provider value={{ getCurrentUser, clearCurrentUser }}>
                {children}
            </CurrentUserActionContext.Provider>
        </CurrentUserStateContext.Provider>
    );
};

export const useCurrentUserState = () => {
    const context = useContext(CurrentUserStateContext);
    if (!context) {
        throw new Error("useCurrentUserState must be used within a CurrentUserProvider");
    }
    return context;
};

export const useCurrentUserActions = () => {
    const context = useContext(CurrentUserActionContext);
    if (!context) {
        throw new Error("useCurrentUserActions must be used within a CurrentUserProvider");
    }
    return context;
};
