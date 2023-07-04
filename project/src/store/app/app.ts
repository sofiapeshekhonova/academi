import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Namespace, SECOND_SORT_RATING_LIST, SORT_RATING_LIST } from '../../constants';

type InitialState = {
  rating: string;
  type: string;
  date: string;
};

const initialState: InitialState = {
  rating: SORT_RATING_LIST[0],
  date: SECOND_SORT_RATING_LIST[0].id,
  type: '',
};

export const appProcess = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeCommentsSort: (state, action: PayloadAction<string>) => {
      state.rating = action.payload;
    },
    changeCommentsSecondSort: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    changeCatalogSort: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  }
});

export const { changeCommentsSort, changeCatalogSort, changeCommentsSecondSort } = appProcess.actions;
