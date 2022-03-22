import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { uploadFile } from 'utils/uploadFile';
import { Image } from 'utils/image';

// thunk for upload image
export const uploadFileThunk = createAsyncThunk(
  'newQuestion/uploadQuestion',
  async (file: File) => {
    console.log(file);
    return await uploadFile(file);
  },
);

// Define a type for the slice state
export interface QuestionSchema {
  // questionId: string | boolean;
  title: string,
  image: Image,
  status: string,
  description: string,
  imageUploading: boolean,
  solutions: any,
}

// Define the initial state using that type
const initialState = {
  // questionId: false,
  title: '',
  description: '',
  image: {},
  imageUploading: false,
  solutions: [],
} as QuestionSchema;

export const createQuestionSlice = createSlice({
  name: 'newQuestion',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state: any) => {
        state.imageUploading = true;
      })
      .addCase(uploadFileThunk.fulfilled, (state: any, action: any) => {
        state.image = JSON.parse(action.payload);
        state.imageUploading = false;
      })
      .addCase(uploadFileThunk.rejected, (state: any, action: any) => {
        state.image = action.payload;
        state.imageUploading = false;
      })
  },
});

export const { setTitle, setDescription, clear } = createQuestionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const newQuestionSelector = (state: RootState) => state.newQuestion;

export const isTitleSet = (title: string) => title.length > 6 && title.length < 140
export const isDescriptionSet = (description: string) => description.length > 6 && description.length < 500
export const stepEnabledSelector = (currentStep: number, step: Number) => (state: RootState) => {
  const { title, description, status } = state.newQuestion
  switch (step) {
    case 1:
      return true
    case 2:
      return isTitleSet(title) && (status === 'draft' || currentStep >= 2)
    case 3:
      return isDescriptionSet(description) && (status === 'draft' || currentStep >= 3)
    default:
      return isTitleSet(title) && isDescriptionSet(description) && (status === 'draft' || currentStep >= step)
  }
}

const createQuestionReducer = createQuestionSlice.reducer;

export default createQuestionReducer;
