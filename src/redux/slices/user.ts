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

export const isAuthUser = createAsyncThunk<IUserStore | null>(
  `${import.meta.env.VITE_REACT_API_URL}`,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isAuthUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(isAuthUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
