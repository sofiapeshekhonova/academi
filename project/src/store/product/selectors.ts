import { Namespace, Status } from '../../constants';
import { ActiveProduct} from '../../types/product';
import { ReviewsPostType, ReviewsType } from '../../types/review';
import { State } from '../../types/state';

export const getActiveProduct = (state: State): ActiveProduct| null => state[Namespace.ActiveProduct].product;
export const getActiveProductStatus = (state: State): Status=> state[Namespace.ActiveProduct].status;

export const getComments = (state: State): ReviewsType[] => state[Namespace.ActiveProduct].comments;
export const getCommentsStatus = (state: State): Status=> state[Namespace.ActiveProduct].commentsStatus;

export const postComment = (state: State): ReviewsPostType[] => state[Namespace.ActiveProduct].comment;
export const getCommentStatus = (state: State): Status=> state[Namespace.ActiveProduct].commentStatus;
