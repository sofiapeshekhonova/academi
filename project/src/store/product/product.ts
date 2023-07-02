import { createSlice } from '@reduxjs/toolkit';
import { Namespace, Status } from '../../constants';
import { fetchActiveProductAction } from '../api-actions';
import { ActiveProduct } from '../../types/product';

export type ProductData = {
  product: ActiveProduct | null;
  status: Status;
};

const initialState: ProductData = {
  product: null,
  status: Status.Idle,
};

export const product = createSlice({
  name: Namespace.ActiveProduct,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveProductAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchActiveProductAction.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.product = action.payload;
      })
      .addCase(fetchActiveProductAction.rejected, (state) => {
        state.status = Status.Failed;
      });
  }
});
