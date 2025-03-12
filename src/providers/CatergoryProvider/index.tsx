import { getAxiosInstance } from "../../utils/axiosInstance";
import { INITIAL_STATE, FoodItemStateContext, FoodItemActionContext } from "./context";
import { FoodByCategoryReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { getFoodByCategoryPending, getFoodByCategorySuccess, getFoodByCategoryError } from "./actions";

export const FoodByCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodByCategoryReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getFoodByCategory = async (category: string) => {
    dispatch(getFoodByCategoryPending());
    const endpoint = `/api/food/category/${category}`;

    try {
      const response = await instance.get(endpoint);
      dispatch(getFoodByCategorySuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(getFoodByCategoryError());
    }
  };

  return (
    <FoodItemStateContext.Provider value={state}>
      <FoodItemActionContext.Provider value={{ getFoodByCategory }}>
        {children}
      </FoodItemActionContext.Provider>
    </FoodItemStateContext.Provider>
  );
};

export const useFoodByCategoryState = () => useContext(FoodItemStateContext);
export const useFoodByCategoryActions = () => useContext(FoodItemActionContext);