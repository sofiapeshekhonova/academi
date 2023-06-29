import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute, AppRoute } from '../constants';
import { ActiveProduct, Product } from '../types/product.js';
import { CommentType, ReviewsType } from '../types/review.js';
import { UserData } from '../types/user/user.js';
import { AuthData, AuthDataRegister } from '../types/auth-data.js';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
// import { dropToken, saveToken } from '../services/token';
// import { redirectToRoute } from './action';

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Products);
    return data;
  },
);

export const fetchActiveProductAction = createAsyncThunk<ActiveProduct, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchActiveProduct',
  async (productId, { extra: api }) => {
    const { data } = await api.get<ActiveProduct>(`${APIRoute.Products}/${productId}`);
    return data;
  },
);

export const fetchProductCommentsAction = createAsyncThunk<ReviewsType[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'room/fetchProductCommentsAction',
  async (productId, { extra: api }) => {
    const { data } = await api.get<ReviewsType[]>(`${APIRoute.Comments}/${productId}`);
    return data;
  }
);


export const postProductCommentsAction = createAsyncThunk<ReviewsType[], CommentType, {
  state: State;
  extra: AxiosInstance;
}>(
  'room/postProductCommentsAction',
  async ({ id, rating, comment }, { extra: api }) => {
    const { data } = await api.post<ReviewsType[]>(`${APIRoute.Comments}/${id}`, { rating, comment });
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const registrationAction = createAsyncThunk<UserData, AuthDataRegister, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/registration',
  async ({ email, password, name}, {dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Registration, { email, password, name });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.logIn));
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, {dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Index));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
