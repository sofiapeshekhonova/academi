import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute, AppRoute } from '../constants';
import { ActiveProduct, FavoritesProducts, Product } from '../types/product.js';
import { CommentType, ReviewsPostType, ReviewsType } from '../types/review.js';
import { UserData } from '../types/user.js';
import { AuthData, AuthDataRegister } from '../types/auth-data.js';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import { toast } from 'react-toastify';

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
  'comments/fetchProductCommentsAction',
  async (productId, { extra: api }) => {
    const { data } = await api.get<ReviewsType[]>(`${APIRoute.Comments}/${productId}`);
    return data;
  }
);

export const postProductCommentsAction = createAsyncThunk<ReviewsPostType[], CommentType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postProductCommentsAction',
  async ({ id, positive, negative, rating }, { dispatch, extra: api }) => {
    const x = Number(rating);
    const { data } = await api.post<ReviewsPostType[]>(`${APIRoute.Comments}/${id}`, { positive, negative, rating: x });
    dispatch(fetchProductCommentsAction(id));
    dispatch(fetchProductsAction());
    dispatch(fetchActiveProductAction(id));
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
    toast.success('Регистрация прошла успешно',
      {position: toast.POSITION.TOP_RIGHT});
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
    dispatch(fetchFavoritesProductsAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch ,extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Index));
  },
);

export const fetchFavoritesProductsAction = createAsyncThunk<Product[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'products/fetchFavoritesProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Product[]>(APIRoute.Favorites);
    return data;
  },
);

export const putFavoriteProductsAction = createAsyncThunk<Product, FavoritesProducts, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/putFavoriteProducts',
  async ({productId }, { dispatch, extra: api }) => {
    const { data } = await api.put<Product>(`${APIRoute.Favorites}/${productId}`);
    dispatch(fetchFavoritesProductsAction());
    return data;
  },
);

export const deleteFavoriteProductsAction = createAsyncThunk<Product, FavoritesProducts, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/deleteFavoriteProducts',
  async ({productId }, { dispatch, extra: api }) => {
    const { data } = await api.delete<Product>(`${APIRoute.DeleteFavorites}/${productId}`);
    dispatch(fetchFavoritesProductsAction());
    return data;
  },
);
