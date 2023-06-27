import { createSlice } from '@reduxjs/toolkit';
import { Namespace, Status } from '../../constants';
import { fetchProductsAction } from '../api-actions';
import { Product } from '../../types/product';
//import { Card } from '../../types/offer';

export type OffersData = {
  products: Product[];
  status: Status;
};

const initialState: OffersData = {
  products: [],
  status: Status.Idle,
};

export const products = createSlice({
  name: Namespace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.status = Status.Failed;
      });
  }
});
