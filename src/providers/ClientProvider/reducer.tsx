import { handleActions } from "redux-actions";
import { INITIAL_CLIENT_STATE, IClientStateContext } from "./context";
import { ClientActionType } from "./actions";

export const ClientReducer = handleActions<IClientStateContext, IClientStateContext>({
    [ClientActionType.SET_PENDING]: (state, action) => ({
        ...state,
        isPending: action.payload as boolean,
    }),
    [ClientActionType.SET_SUCCESS]: (state, action) => ({
        ...state,
        isSuccess: action.payload as boolean,
    }),
    [ClientActionType.SET_ERROR]: (state, action) => ({
        ...state,
        isError: action.payload as boolean,
    }),
    [ClientActionType.LOGIN]: (state, action) => ({
        ...state,
        client: action.payload as string,
        isSuccess: true,
        isPending: false,
        isError: false,
    }),
    [ClientActionType.LOGOUT]: (state) => ({
        ...state,
        client: null,
        isSuccess: false,
        isPending: false,
        isError: false,
    }),
}, INITIAL_CLIENT_STATE);
