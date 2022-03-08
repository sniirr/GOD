import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store';
import axios from "axios";
import _ from 'lodash'
import {QuestionSchema} from "./createQuestionReducer";
import {Solution} from "types";

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
            const {payload: solution} = action
            const question = _.get(state, solution.parentId) as QuestionSchema
            question.solutions.push(solution)
        },
        likeSolution: (state, action: PayloadAction<any>) => {
            const {payload: {qid, sid, userId, vote}} = action
            const question = _.get(state, qid) as QuestionSchema
            const i = _.findIndex(question.solutions, (s: Solution) => s._id === sid)
            question.solutions[i].likes[userId] = vote
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
export const addSolution = (solution: Solution) => async (dispatch: any) => {
    try {
        const {data} = await axios.post('/questions/add-solution', solution)

        dispatch(questionsSlice.actions.addSolution(data))
    } catch (error) {
        console.error(error);
    }
}

export const likeSolution = (qid: string, sid: string, userId: string, vote: boolean) => async (dispatch: any) => {
    try {
        const {data} = await axios.post('/questions/like-solution', {sid, vote})

        console.log('likeSolution', {data})

        dispatch(questionsSlice.actions.likeSolution({qid, sid, vote, userId}))
    } catch (error) {
        console.error(error);
    }
}

// selectors
export const allQuestions = (state: RootState) => state.questions
export const allQuestionsArray = (state: RootState) => _.values(state.questions)
export const questionById = (qid: string) => (state: RootState) => _.get(state, ['questions', qid], {}) as QuestionSchema

export default questionsSlice.reducer
