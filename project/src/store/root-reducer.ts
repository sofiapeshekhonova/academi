import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../constants';
import { products } from './products/products';
import { product } from './product/product';
import { appProcess } from './app/app';
import { userProcess } from './user/user';
import { comments } from './comments/comments';

export const rootReducer = combineReducers({
  [Namespace.Products]: products.reducer,
  [Namespace.ActiveProduct]: product.reducer,
  [Namespace.App]: appProcess.reducer,
  [Namespace.User]: userProcess.reducer,
  [Namespace.Comments]: comments.reducer,
});
