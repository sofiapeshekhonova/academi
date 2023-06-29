import { createSlice } from '@reduxjs/toolkit';
import { Namespace, Status } from '../../constants';
import { fetchActiveProductAction, fetchProductCommentsAction, postProductCommentsAction } from '../api-actions';
import { ActiveProduct } from '../../types/product';
import { ReviewsType } from '../../types/review';

export type ProductData = {
  product: ActiveProduct | null;
  status: Status;
  commentsStatus: Status;
  comments: ReviewsType[];
  comment: ReviewsType[];
  commentStatus: Status;
};

const initialState: ProductData = {
  product: null,
  status: Status.Idle,
  commentsStatus: Status.Idle,
  comments: [],
  comment: [],
  commentStatus: Status.Idle,
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
      })
      .addCase(fetchProductCommentsAction.pending, (state) => {
        state.commentsStatus = Status.Loading;
      })
      .addCase(fetchProductCommentsAction.fulfilled, (state, action) => {
        state.commentsStatus = Status.Success;
        state.comments = action.payload;
      })
      .addCase(fetchProductCommentsAction.rejected, (state) => {
        state.commentsStatus = Status.Failed;
      })
      .addCase(postProductCommentsAction.pending, (state) => {
        state.commentStatus = Status.Loading;
      })
      .addCase(postProductCommentsAction.fulfilled, (state, action) => {
        state.commentStatus = Status.Success;
        state.comment = action.payload;
      })
      .addCase(postProductCommentsAction.rejected, (state) => {
        state.commentStatus = Status.Failed;
      });
  }
});
