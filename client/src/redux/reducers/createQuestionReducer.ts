import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { uploadFile } from '../../controlers/assets';


interface Image {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  widthuploadfile: number;
  heightuploadfile: number;
  formatuploadfile: string;
  resource_typeuploadfile: string;
  created_atuploadfile: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  original_extension: string;
}

//thunk for upload image
export const uploadFileThunk = createAsyncThunk(
  'newQuestion/uploadQuestion',
  async (file: File, thunkAPI) => {
    console.log(file);
    const fileData = await uploadFile(file);
    return fileData;
  }
)

// Define a type for the slice state
interface CounterState {
  value: number,
  title: string,
  image: Image,
  status: string,
  description: string,
  loader: boolean,
  enableMoveTo2:boolean,
  enableMoveTo3:boolean
}

// Define the initial state using that type
const initialState = {
  value: 1,
  title: '',
  description: '',
  image: {},
  status: '',
  loader: false,
  enableMoveTo2:false,
  enableMoveTo3:false,
} as CounterState;

export const counterSlice = createSlice({
  name: 'newQuestion',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {

      if (state.value < 4) state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 1) state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setEnableMoveTo2:(state, action)=>{
      state.enableMoveTo2 =action.payload;
    },
    setEnableMoveTo3:(state, action)=>{
      state.enableMoveTo3 =action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadFileThunk.pending, (state: any, action: any) => {
        state.status = 'pending';
        state.loader = true;
      })
      .addCase(uploadFileThunk.fulfilled, (state: any, action: any) => {
        state.image = JSON.parse(action.payload);
        state.status = 'success';
        state.loader = false;
      })
      .addCase(uploadFileThunk.rejected, (state: any, action: any) => {
        state.image = action.payload;
        state.status = 'failed';
        state.loader = false;
      })
  }
})

export const { increment, decrement, incrementByAmount, setTitle, setDescription,setEnableMoveTo2,setEnableMoveTo3 } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;
export const selectTitle = (state: RootState) => state.counter.title;
export const selectDescription = (state: RootState) => state.counter.description;
export const selectLoader = (state: RootState) => state.counter.loader;
export const selectImage = (state: RootState) => state.counter.image;
export const selectEnableMoveTo2 = (state:RootState)=> state.counter.enableMoveTo2;
export const selectEnableMoveTo3 = (state:RootState)=> state.counter.enableMoveTo3;

export default counterSlice.reducer