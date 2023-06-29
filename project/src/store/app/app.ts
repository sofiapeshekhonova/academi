import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Namespace, SortRatingList } from '../../constants';

type InitialState = {
  rating: string;
  type: string;
};

const initialState: InitialState = {
  rating: SortRatingList[0],
  type: 'null',
};

export const appProcess = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeCommentsSort: (state, action: PayloadAction<string>) => {
      state.rating = action.payload;
    },
    changeCatalogSort: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  }
});

export const { changeCommentsSort, changeCatalogSort } = appProcess.actions;
