import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IUserStore } from "../types/user";
import { defaultUserState } from "../default-state/user";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import api from "@/src/axios/api";
import { keyValue, removeDataFromLS } from "@/src/utils";

export interface IUserState {
  user: IUserStore;
  loading: boolean;
  error?: string | null;
  isAuth: boolean;
}

export const fetchIsAuthUser = createAsyncThunk<IUserStore>(
  "user/fetchIsAuthUser",
  async () => {
    const response = await api.get(EndpointsEnum.PROFILE);

    return await response.data;
  }
);

export const fetchIsLogoutUser = createAsyncThunk(
  "user/fetchIsLogoutUser",
  async () => {
    const response = await api.post(EndpointsEnum.LOGOUT, {});
    removeDataFromLS(keyValue.ACCESS_TOKEN);
    return await response.data;
  }
);

const initialState: IUserState = {
  user: defaultUserState,
  isAuth: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userPending: (state) => {
      state.error = null;
    },
    userFulfilled: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    userRejected: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.error = initialState.error;
      state.isAuth = initialState.isAuth;
      state.loading = initialState.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIsLogoutUser.fulfilled, (state) => {
        state.user = initialState.user;
        state.error = initialState.error;
        state.isAuth = initialState.isAuth;
        state.loading = initialState.loading;
      })

      .addMatcher(
        isAnyOf(fetchIsAuthUser.pending, fetchIsLogoutUser.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchIsAuthUser.rejected, fetchIsLogoutUser.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { userPending, userFulfilled, userRejected, logout } =
  userSlice.actions;
export default userSlice.reducer;
