import { ReviewsType } from '../../types/review';
import FilterCommentsSort from '../filter-comments-sort/filter-comments-sort';
import ProductComments from '../product-comments/product-comments';

type PropsType = {
  selectedSortItem: string;
  comments: ReviewsType[];
}
function Comments({ selectedSortItem, comments }: PropsType) {
  return (
    <>
      <FilterCommentsSort selectedSortItem={selectedSortItem} />
      <ProductComments comments={comments} />
    </>
  );
}

export default Comments;
