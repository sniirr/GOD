import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { makeReducer } from "utils/reduxUtils";
import type { RootState } from '../store';

export interface User {
  displayName: string;
  _id: string;
}

export const getUser = () => async (dispatch: any) => {
  try {
    const { data: user } = await axios.get('/user/get-user');

    dispatch({ type: 'SET_USER', payload: user })
  } catch (err) {
    console.error(err);
  }
}

export const searchUsersByEmail = async (term: string, opts: any) => {
  try {
    const { data: users } = await axios.post('/user/search', { term, opts });
    return users;
  } catch (err) {
    console.error(err);
    return []
  }
}

const initialState = {} as User;

export const userSelector = (state: RootState) => state.user;

const userReducer = makeReducer({
  SET_USER: (state: any, action: PayloadAction<any>) => action.payload,
}, initialState)

export default userReducer;
