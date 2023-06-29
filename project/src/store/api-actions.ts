import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute, AppRoute } from '../constants';
import { ActiveProduct, Product } from '../types/product.js';
import { ReviewsType } from '../types/review.js';
import { UserData } from '../types/user/user.js';
import { AuthData } from '../types/auth-data.js';
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

// export const postRoomCommentsAction = createAsyncThunk<ReviewsType[], CommentType, {
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'room/postRoomCommentsAction',
//   async ({ cardId, rating, comment }, { extra: api }) => {
//     const { data } = await api.post<ReviewsType[]>(`${APIRoute.Comments}/${cardId}`, { rating, comment });
//     return data;
//   }
// );

// export const fetchNearOffersAction = createAsyncThunk<Card[], number, {
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'room/fetchNearOffersAction',
//   async (hotelId, { extra: api }) => {
//     const { data } = await api.get<Card[]>(`${APIRoute.Hotels}/${hotelId}/nearby`);
//     return data;
//    }
// );

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

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, {dispatch, extra: api }) => {
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
