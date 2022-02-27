import {createSlice, createAsyncThunk, PayloadAction, current} from '@reduxjs/toolkit'
import type {RootState} from '../store';
import axios from "axios";
import _ from 'lodash'
import {QuestionSchema} from "./createQuestionReducer";

function getAllQuestions(){
    return new Promise((resolve, reject)=>{
        axios.post('/questions/get-all', {})
            .then(({ data }) => {
                if(Array.isArray(data.result)) resolve(data.result);
                else reject()
            }).catch(e => {
            console.error(e)
            reject([]);
        })
    })
}

export const getQuestionsThunk = createAsyncThunk(
    'questions/getQuestions',
    async (thunkAPI) => await getAllQuestions()
)

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {},
    reducers: {
        addSolution: (state, action: PayloadAction<any>) => {
            const {payload: {qid, solution}} = action
            // const {questionId} = payload
            const q = _.get(state, qid) as QuestionSchema
            q.solutions.push(solution)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getQuestionsThunk.fulfilled, (state: any, action: any) => {
                return _.keyBy(action.payload, '_id')
            })
    }
})

// actions
export const {addSolution} = questionsSlice.actions

export const allQuestions = (state: RootState) => state.questions
export const allQuestionsArray = (state: RootState) => _.values(state.questions)
export const questionById = (qid: string) => (state: RootState) => _.get(state, ['questions', qid], {}) as QuestionSchema

export default questionsSlice.reducer
