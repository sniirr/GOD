import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { filter, reverse, find } from 'lodash'
import type { RootState } from "../store";

export interface Message {
  id: string;
  text: string;
  creator: any;
  parentId: string;
  parentType: "question";
  error: boolean;
  isPending: boolean;
  likes: any;
}
interface Chat {
  messages: Array<Message>;
}

function getDiscussion(qid: string) {
  return new Promise((resolve, reject) => {
    axios
      .post("/discussion/get-discussion", { qid })
      .then(({ data }) => {
        if (Array.isArray(data.result)) {
          resolve(data.result);
        } else {
          reject(new Error("On getting discussion, it didnt return an array"));
        }
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}

export const getDiscussionThunk = createAsyncThunk(
  "discussion/getDiscussion",
  async (qid: string) => await getDiscussion(qid),
);

const initialState = {
  messages: [],
} as Chat;

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: { payload: Message; type: string }) => {
      state.messages = [action.payload, ...state.messages];
    },
    replaceMessage: (state, action: { payload: Message; type: string }) => {
      state.messages = [action.payload, ...filter(state.messages, (m) => !m.isPending)];
    },
    likeMessage: (state, action: PayloadAction<any>) => {
      const {
        payload: {
          mid, userId, vote,
        },
      } = action;
      const message = find(state.messages, { _id: mid }) as Message;
      if (!message.likes) {
        message.likes = {};
      }
      message.likes[userId] = vote;
    },
    clearChat: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getDiscussionThunk.fulfilled, (state: any, action: any) => {
      state.messages = reverse(action.payload);
    });
  },
});

export const likeMessage = (mid: string, userId: string, vote: boolean) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/discussion/like-message', { mid, vote });

    dispatch(chatSlice.actions.likeMessage({
      mid, vote: data.resolvedVote, userId,
    }));
  } catch (error) {
    console.error(error);
  }
};

export const { addMessage, replaceMessage, clearChat } = chatSlice.actions;

// selectors
export const allMessages = (state: RootState) => state.chats.messages;

const chatReducer = chatSlice.reducer;

export default chatReducer;
