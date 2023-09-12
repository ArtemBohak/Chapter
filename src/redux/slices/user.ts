import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserStore } from "../types/user";
import { defaultUserState } from "../default-state/user";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import api from "@/src/axios/api";

export interface IUserState {
  user: IUserStore;
  loading: boolean;
  error?: string | null;
  isAuth: boolean;
}

export const fetchIsAuthUser = createAsyncThunk<IUserStore>(
  "user/fetchIsAuthUser",
  async () => {
    const response = await api.get(`${EndpointsEnum.PROFILE}`);
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
    loginByPending(state) {
      state.error = null;
    },
    loginByFulfilled: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    loginByRejected: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIsAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIsAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginByFulfilled, loginByRejected, loginByPending } =
  userSlice.actions;
export default userSlice.reducer;
