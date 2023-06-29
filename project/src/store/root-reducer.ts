import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../constants';
import { products } from './products/products';
import { product } from './product/product';
import { appProcess } from './app/app';

export const rootReducer = combineReducers({
  [Namespace.Products]: products.reducer,
  [Namespace.ActiveProduct]: product.reducer,
  [Namespace.App]: appProcess.reducer,
});
