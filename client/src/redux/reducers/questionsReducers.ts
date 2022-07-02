import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { get, set, findIndex, keyBy, values, mapValues, sum, reduce } from 'lodash';
import { Solution } from 'types';
import { QuestionSchema } from './createQuestionReducer';
import type { RootState } from '../store';

const getMemberQuestions = async () => {
  try {
    const response = await axios.post('/questions/get-all')
    return response.data
  }
  catch (e) {
    console.error(`Failed to getMemberQuestions`, { e })
    return []
  }
}

export const getQuestionById = async (qid: string) => {
  try {
    const response = await axios.post('/questions/get-by-id', { qid })
    return response.data
  }
  catch (e) {
    console.error(`Failed to getQuestionsById ${qid}`, { e })
    return []
  }
}

export const getMemberQuestionsThunk = createAsyncThunk(
  'questions/getQuestions',
  getMemberQuestions,
);

export const getQuestionByIdThunk = createAsyncThunk(
  'questions/getById',
  getQuestionById,
);

const initialState = {}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    upsertQuestion: (state, action: PayloadAction<any>) => {
      const { payload: question } = action;
      // @ts-ignore
      state[question._id] = question
    },
    addSolution: (state, action: PayloadAction<any>) => {
      const { payload: solution } = action;
      const question = get(state, solution.parentId) as QuestionSchema;
      question.solutions.push(solution);
    },
    likeSolution: (state, action: PayloadAction<any>) => {
      const {
        payload: {
          qid, sid, userId, vote,
        },
      } = action;
      const question = get(state, qid) as QuestionSchema;
      const i = findIndex(question.solutions, (s: Solution) => s._id === sid);
      if (!question.solutions[i].likes) {
        question.solutions[i].likes = {};
      }
      question.solutions[i].likes[userId] = vote;
    },
    publishQuestion: (state, action: PayloadAction<any>) => {
      const { payload: { questionId } } = action;
      const question = get(state, questionId) as QuestionSchema;
      question.status = 'active'
    },
    setVoteCounters: (state, action: PayloadAction<any>) => {
      const { payload: { qid, voteCounters } } = action
      const question = get(state, qid) as QuestionSchema;
      question.voteCounters = voteCounters
    },
    setUserVote: (state, action: PayloadAction<any>) => {
      const { payload: { uid, qid, userVotes } } = action
      const question = get(state, qid) as QuestionSchema;
      set(question.votes, uid, userVotes)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberQuestionsThunk.pending, () => initialState)
      .addCase(getMemberQuestionsThunk.fulfilled, (state: any, action: any) => keyBy(action.payload, '_id'))
      .addCase(getQuestionByIdThunk.fulfilled, (state: any, action: any) => {
        const question = action.payload
        state[question._id] = question
      });
  },
});

export const getQuestionsVotes = (qid: string) => async (dispatch: any) => {
  try {
    const res = await axios.post('/questions/get-votes', { qid })

    const voteCounters = res.data

    const sumVotes = reduce(voteCounters, (_sum, { options }) => {
      return _sum + sum(options)
    }, 0)

    console.log({ voteCounters, sumVotes })
    dispatch(questionsSlice.actions.setVoteCounters({ qid, voteCounters }))
  }
  catch (e) {
    console.error(e)
  }
}

// actions
interface UpsertQuestionPayload {
  _id?: string;
  title: string;
  description: string;
  image: any;
  schedule: any;
  status?: string;
}

export const upsertQuestion = (question: UpsertQuestionPayload, cb?: Function) => async (dispatch: any) => {
  try {
    if (!question.title) return
    const { data } = await axios.post('/questions/upsert', question);
    dispatch(questionsSlice.actions.upsertQuestion(data))
    if (cb) cb()
  } catch (error) {
    console.error(error);
  }
}

export const publishQuestion = (questionId: string, cb?: Function) => async (dispatch: any) => {
  try {
    await axios.post('/questions/activate', { activate: true, questionId });
    dispatch(questionsSlice.actions.publishQuestion({ questionId }));
    if (cb) cb()
  } catch (e) {
    console.error(e);
  }
}

export const addUsersToQuestion = async (qid: string, emails: string[]) => {
  try {
    return await axios.post('/questions/add-members', { qid, emails });
  } catch (e) {
    console.error(e);
    return null
  }
}

export const addSolution = (solution: Solution) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/questions/add-solution', solution);

    dispatch(questionsSlice.actions.addSolution(data));
  } catch (error) {
    console.error(error);
  }
};

export const likeSolution = (qid: string, sid: string, userId: string, vote: boolean) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/questions/like-solution', { sid, vote });

    dispatch(questionsSlice.actions.likeSolution({
      qid, sid, vote: data.resolvedVote, userId,
    }));
  } catch (error) {
    console.error(error);
  }
};

export const vote = (qid: string, sid: string, uid: string, value: number) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/questions/vote', { qid, sid, value });

    dispatch(getQuestionsVotes(qid))
    dispatch(questionsSlice.actions.setUserVote({
      uid,
      qid,
      userVotes: data.resolvedVote,
    }))
  } catch (error) {
    console.error(error);
  }
};

// selectors
export const questionsSelector = (state: RootState) => values(state.questions);
export const questionByIdSelector = (qid: string) => (state: RootState) => get(state, ['questions', qid]) as QuestionSchema | null;

const questionsReducer = questionsSlice.reducer;

export default questionsReducer;
