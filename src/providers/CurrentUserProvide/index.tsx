"use client";
import { useContext, useReducer } from "react";
import Cookies from "js-cookie";
import { getAxiosInstance } from "@/utils/axiosInstance";

import {
  CurrentUserActionContext,
  CurrentUserStateContext,
  INITIAL_CURRENT_USER_STATE,
} from "./context";
import { currentUserReducer } from "./reducer";
import {
  getCurrentUserAction,
  setPendingAction,
  setSuccessAction,
  setErrorAction,
} from "./action";

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    currentUserReducer,
    INITIAL_CURRENT_USER_STATE
  );
  const instance = getAxiosInstance();

  const getCurrentUser = async () => {
    dispatch(setPendingAction(true));

    try {
      const endpoint = "/api/user/current";
      const response = await instance.get(endpoint);

      if (response?.data?.currentUser) {
        // Store token in cookie
        const token = response.data.token;
        if (token) {
          Cookies.set("token", token, { expires: 3 });
        }

        // Update state with user data
        dispatch(getCurrentUserAction(response.data.currentUser));
        dispatch(setSuccessAction(true));
      } else {
        throw new Error("Invalid user data received");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(setErrorAction(true));
    } finally {
      dispatch(setPendingAction(false));
    }
  };

  return (
    <CurrentUserStateContext.Provider value={state}>
      <CurrentUserActionContext.Provider value={{ getCurrentUser }}>
        {children}
      </CurrentUserActionContext.Provider>
    </CurrentUserStateContext.Provider>
  );
};

export const useCurrentUserState = () => {
  const context = useContext(CurrentUserStateContext);
  if (!context) {
    throw new Error(
      "useCurrentUserState must be used within a CurrentUserProvider"
    );
  }
  return context;
};

export const useCurrentUserActions = () => {
  const context = useContext(CurrentUserActionContext);
  if (!context) {
    throw new Error(
      "useCurrentUserActions must be used within a CurrentUserProvider"
    );
  }
  return context;
};
