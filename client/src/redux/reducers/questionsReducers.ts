import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { uploadFile } from '../../controlers/assets';
import { activateQuestion, getAllQuestions } from '../../controlers/questions/questions';
import { Image } from '../../model/image';

import {QuestionSchema} from './createQuestionReducer';

export const getQuestionsThunk = createAsyncThunk(
    'newQuestion/getQuestions',
    async (thunkAPI) => {
        const questions = await getAllQuestions();
        return questions
    }
)

const initialState = {
   
    questionsLoder:false,
    questions:[]
  } as QuestionSchema;

  export const questionsSlice = createSlice({
    name: 'questions',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers: builder => {
      builder
        .addCase(getQuestionsThunk.pending, (state:any, action:any)=>{
          state.loadingQuestions = true;
        })
        .addCase(getQuestionsThunk.fulfilled, (state:any, action:any)=>{
          state.questions = action.payload;
          state.loadingQuestions = false;
        })
        .addCase(getQuestionsThunk.rejected, (state:any, action:any)=>{
          state.loadingQuestions = false;
          state.error = action.payload;
        })
    }
  })

  export const allQuestions = (state: RootState) => state.questions.questions;

  export default questionsSlice.reducer
