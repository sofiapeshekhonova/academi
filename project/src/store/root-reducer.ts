import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../constants';
import { products } from './products/products';

export const rootReducer = combineReducers({
  [Namespace.Products]: products.reducer,
});
