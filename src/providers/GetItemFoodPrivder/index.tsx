import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, FoodItemStateContext, FoodItemActionContext } from "./context";
import { FoodItemReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { getFoodItemsPending, getFoodItemsSuccess, getFoodItemsError } from "./action";

export const FoodItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodItemReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getFoodItems = async () => {
    dispatch(getFoodItemsPending());
    const endpoint = `/api/food`;

    try {
      const response = await instance.get(endpoint);
      dispatch(getFoodItemsSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(getFoodItemsError());
    }
  };

  return (
    <FoodItemStateContext.Provider value={state}>
      <FoodItemActionContext.Provider value={{ getFoodItems }}>
        {children}
      </FoodItemActionContext.Provider>
    </FoodItemStateContext.Provider>
  );
};

export const useFoodItemState = () => {
  return useContext(FoodItemStateContext);
};

export const useFoodItemActions = () => {
  return useContext(FoodItemActionContext);
}