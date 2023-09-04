import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { userSlice } from "../slices";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const store = makeStore();
