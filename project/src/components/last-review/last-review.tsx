import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getComments } from '../../store/comments/selectors';
import { fetchProductCommentsAction } from '../../store/api-actions';
import { Product } from '../../types/product';
import { COMMENTS, SECOND_SORT_RATING_LIST } from '../../constants';
import { SortDateComments } from '../../untils/sort-comments';
import { ReviewsType } from '../../types/review';
import Comment from '../comment/comment';

type PropsType = {
  product: Product;
}
function LastReview({ product }: PropsType) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductCommentsAction(product.id));

  }, [dispatch, product.id]);
  const comments = useAppSelector(getComments);
  let sortedComments;
  if(comments.length === 0) {
    sortedComments = SortDateComments(COMMENTS, SECOND_SORT_RATING_LIST[0].id);
  } else {
    sortedComments = SortDateComments(comments, SECOND_SORT_RATING_LIST[0].id);
  }
  let comment: ReviewsType;
  if(sortedComments === undefined) {
    comment = COMMENTS[0];
  } else {
    comment = sortedComments[0];
  }
  return (
    <section className="last-review">
      <div className="container">
        <h2 className="last-review__title">последний отзыв</h2>
        <Comment comment={comment} />
      </div>
    </section>
  );
}

export default LastReview;
