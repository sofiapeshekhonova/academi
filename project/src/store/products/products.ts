import { createSlice } from '@reduxjs/toolkit';
import { Namespace, Status } from '../../constants';
import { fetchFavoritesProductsAction, fetchProductsAction } from '../api-actions';
import { Product } from '../../types/product';

export type ProductsData = {
  products: Product[];
  status: Status;
  statusFavorites: Status;
  productsFavorites: Product[];
};

const initialState: ProductsData = {
  products: [],
  status: Status.Idle,
  statusFavorites: Status.Idle,
  productsFavorites: [],
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
      })
      .addCase(fetchFavoritesProductsAction.pending, (state) => {
        state.statusFavorites = Status.Loading;
      })
      .addCase(fetchFavoritesProductsAction.fulfilled, (state, action) => {
        state.statusFavorites = Status.Success;
        state.productsFavorites = action.payload;
      })
      .addCase(fetchFavoritesProductsAction.rejected, (state) => {
        state.statusFavorites = Status.Failed;
      });
  }
});
