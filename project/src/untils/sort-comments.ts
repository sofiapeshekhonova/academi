import { SORT_RATING_LIST } from '../constants';
import { ReviewsType } from '../types/review';

export function SortDateComments(comments: ReviewsType[], sortListItem: string) {
  switch (sortListItem) {
    case 'first':
      return comments.slice().sort((a, b) => a.isoDate < b.isoDate ? 1 : -1);
    case 'second':
      return comments.slice().sort((a, b) => a.isoDate > b.isoDate ? 1 : -1);
    default:
      return comments.slice().sort((a, b) => a.isoDate < b.isoDate ? 1 : -1);
  }
}

export function SortRatingComments(comments: ReviewsType[], sortListItem: string) {
  switch (sortListItem) {
    case SORT_RATING_LIST[0]:
      return comments;
    case SORT_RATING_LIST[1]:
      return comments.slice().filter((i) => i.rating > 3);
    case SORT_RATING_LIST[2]:
      return comments.slice().filter((i) => i.rating <= 3);
    default:
      return comments;
  }
}
