import { PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { keyBy } from 'lodash'
import { makeReducer } from "utils/reduxUtils";
import type { RootState } from '../store';

export interface Organization {
  _id: string;
  name: string;
}

export const organizationsSelector = (state: RootState) => state.organizations;

const userReducer = makeReducer({
  SET_ORGANIZATIONS: (state: any, action: PayloadAction<any>) => keyBy(action.payload, '_id'),
}, [])

export default userReducer;
