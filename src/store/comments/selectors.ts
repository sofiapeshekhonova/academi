import { Namespace, Status } from '../../constants';
import { ReviewsPostType, ReviewsType } from '../../types/review';
import { State } from '../../types/state';


export const getComments = (state: State): ReviewsType[] => state[Namespace.Comments].comments;
export const getCommentsStatus = (state: State): Status=> state[Namespace.Comments].commentsStatus;

export const postComment = (state: State): ReviewsPostType[] => state[Namespace.Comments].comment;
export const getCommentStatus = (state: State): Status=> state[Namespace.Comments].commentStatus;

export const getLastComment = (state: State): ReviewsType | null => state[Namespace.Comments].lastComment;
export const getLastCommentStatus = (state: State): Status=> state[Namespace.Comments].LastCommentStatus;

