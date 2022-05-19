import { PayloadAction } from '@reduxjs/toolkit';
// import { keyBy } from 'lodash'
import { makeReducer } from "utils/reduxUtils";
import type { RootState } from '../store';

export const setSelectedOrg = (orgId: string) => ({
  type: 'SET_SELECTED_ORG',
  payload: orgId,
})

export const selectedOrgIdSelector = (state: RootState) => state.main.selectedOrgId;

const mainReducer = makeReducer({
  SET_SELECTED_ORG: (state: any, action: PayloadAction<string>) => ({
    ...state,
    selectedOrgId: action.payload,
  }),
}, {
  selectedOrgId: null,
})

export default mainReducer;
