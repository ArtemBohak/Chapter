import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { EndpointsEnum, api } from "@/src/axios";
import { keysValue } from "@/src/types";
import { removeDataFromLS } from "@/src/utils";

import { IUserStore } from "../types/user";
import { defaultUserState } from "../default-state/user";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

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
    removeDataFromLS(keysValue.ACCESS_TOKEN);
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
    userLoading: (state) => {
      state.error = null;
    },
    setUserCredData: (state, action) => {
      state.user.email = action.payload.email;
      state.user.id = action.payload.id;
    },
    updateUser: (state, action: PayloadAction<IUserStore>) => {
      state.user = {
        ...action.payload,
        avatarUrl: action.payload.avatarUrl
          ? action.payload.avatarUrl
          : defaultAvatar,
      };
      state.isAuth = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = initialState.user;
      state.error = initialState.error;
      state.isAuth = initialState.isAuth;
      state.loading = initialState.loading;
    },
    userError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsAuthUser.fulfilled, (state, action) => {
        state.user = {
          ...action.payload,
          avatarUrl: action.payload.avatarUrl
            ? action.payload.avatarUrl
            : defaultAvatar,
        };
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

export const {
  userLoading,
  updateUser,
  logoutUser,
  userError,
  setUserCredData,
} = userSlice.actions;
export default userSlice.reducer;
