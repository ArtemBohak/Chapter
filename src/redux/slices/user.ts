import { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserStore } from "../types/user";
import { defaultUserState } from "../default-state/user";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import api from "@/src/axios/api";

export interface IUserState {
  user: IUserStore;
  loading: boolean;
  error?: string | null;
}

export const fetchUserById = createAsyncThunk<
  AxiosResponse<IUserState> | null,
  number
>(`${import.meta.env.VITE_REACT_API_URL}`, async (userId: number) => {
  const response = await api.get(`${EndpointsEnum.USERS}/${userId}`);
  return await response.data;
});

const initialState: IUserState = {
  user: defaultUserState,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.user = action.payload?.data.user;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
