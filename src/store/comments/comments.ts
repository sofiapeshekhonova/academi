import { createSlice } from '@reduxjs/toolkit';
import { Namespace, Status } from '../../constants';
import { fetchLastProductCommentsAction, fetchProductCommentsAction, postProductCommentsAction } from '../api-actions';
import { ReviewsPostType, ReviewsType } from '../../types/review';

export type ProductData = {
  commentsStatus: Status;
  comments: ReviewsType[];
  comment: ReviewsPostType[];
  commentStatus: Status;
  LastCommentStatus: Status;
  lastComment: ReviewsType | null;
};

const initialState: ProductData = {
  commentsStatus: Status.Idle,
  comments: [],
  comment: [],
  lastComment: null,
  commentStatus: Status.Idle,
  LastCommentStatus: Status.Idle,
};

export const comments = createSlice({
  name: Namespace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
      })
      .addCase(fetchLastProductCommentsAction.pending, (state) => {
        state.LastCommentStatus = Status.Loading;
      })
      .addCase(fetchLastProductCommentsAction.fulfilled, (state, action) => {
        state.LastCommentStatus = Status.Success;
        state.lastComment = action.payload;
      })
      .addCase(fetchLastProductCommentsAction.rejected, (state) => {
        state.LastCommentStatus = Status.Failed;
      });
  }
});
