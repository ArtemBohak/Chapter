import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { EndpointsEnum, api } from "@/src/axios";
import { keysValue } from "@/src/types";
import { removeDataFromLS } from "@/src/utils";

import {  IUserStore } from "../types/user";
import { defaultUserState } from "../default-state/user";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { bookProps } from "@/src/components/BookShelf/AddBookModal/AddBookForm/AddBookForm.type";
import { isAxiosError } from "axios";

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

export const deleteUserBook = createAsyncThunk(
  "user/fetchDeleteUserBook",
 async ( bookId: number) => {
    const response = bookId;
    return response;
  }
) 
export const fetchFavoriteBookStatus = createAsyncThunk(
  "user/fetchFavoriteBookStatus",
  async (bookId: number) => {
    const {data} = await api.patch(`${EndpointsEnum.TOOGLE_FAVORITE_BOOKS}${bookId}`);
    return { bookId, data };
  }
);
export const addNewBook = createAsyncThunk(
  "user/addNewBook",
  async (values: bookProps) => {
    try {
      const {data} = await api.post(EndpointsEnum.USERS_BOOKS, values);
  
      return {data};
    } catch (error) {
      if (isAxiosError(error)) {
        return error.response?.data;
      }
    }
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
      
      .addCase(deleteUserBook.fulfilled, (state, action) => {
        const bookIdToDelete = action.meta.arg
        state.user.userBooks = state.user.userBooks.filter(book => book.id !== bookIdToDelete);
      })
      .addCase(fetchFavoriteBookStatus.fulfilled, (state, action) => {
        const { bookId, data } = action.payload;
        state.user.userBooks = state.user.userBooks.map(book => {
          if (book.id === bookId) {
            book.favorite_book_status = data.favorite_book_status;
          }
          return book;
        });
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.user.userBooks = [...state.user.userBooks, data]
      })
      .addMatcher(
        isAnyOf(fetchIsAuthUser.pending, fetchIsLogoutUser.pending, addNewBook.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchIsAuthUser.rejected, fetchIsLogoutUser.rejected, addNewBook.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { userLoading, updateUser, logoutUser, userError } =
  userSlice.actions;
export default userSlice.reducer;
