import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { filter, reverse } from 'lodash'
import type { RootState } from "../store";

export interface Message {
  id: string;
  text: string;
  creator: any;
  parentId: string;
  parentType: "question";
  error: boolean;
  isPending: boolean;
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
    clearChat: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getDiscussionThunk.fulfilled, (state: any, action: any) => {
      state.messages = reverse(action.payload);
    });
  },
});

export const { addMessage, replaceMessage, clearChat } = chatSlice.actions;

// selectors
export const allMessages = (state: RootState) => state.chats.messages;

const chatReducer = chatSlice.reducer;

export default chatReducer;
