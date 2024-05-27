import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PostsSliceState {
  file: File | null,
  title: string,
  image: string,
  caption: string
}

const initialState: PostsSliceState = {
  file: null,
  image: '',
  title: '',
  caption: ''
}

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: initialState,
  reducers: {
    changeTitle: (state, payload: PayloadAction<string>) => {
      state.title = payload.payload
    },
    changeImage: (state, payload: PayloadAction<string>) => {
      state.image = payload.payload
    },
    changeFile: (state, payload: PayloadAction<File | null>) => {
      state.file = payload.payload
    },
    changeCaption: (state, payload: PayloadAction<string>) => {
      state.caption = payload.payload
    },
    resetPostValues: (state) => {
      state.caption = '',
      state.file = null,
      state.image = '',
      state.title = ''
    }
  }
})

export const {
  changeFile,
  changeImage,
  changeTitle,
  changeCaption,
  resetPostValues
} = postsSlice.actions
export default postsSlice.reducer