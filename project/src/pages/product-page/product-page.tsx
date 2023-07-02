import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductDetails from '../../components/product-details/product-details';
import ReviewForm from '../../components/review-form/review-form';
import EmptyProductFilterResult from '../../components/empty-product-filter-result/empty-product-filter-result';
import Comments from '../../components/comments/comments';
import Layout from '../../components/layout/layout';
import EmptyReviewResults from '../../components/empty-review-results/empty-review-results';
import ProductCommentsError from '../../components/product-comments-error/product-comments-error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../constants';
import { SortDateComments, SortRatingComments } from '../../untils/sort-comments';
import { fetchActiveProductAction, fetchProductCommentsAction } from '../../store/api-actions';
import { getActiveProduct, getActiveProductStatus } from '../../store/product/selectors';
import { getSecondSortCommentsItem, getSortCommentsItem } from '../../store/app/selectors';
import { getComments, getCommentsStatus } from '../../store/comments/selectors';
import './product-page.css';

function ProductPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const [openReview, setOpenReview] = useState(false);
  const product = useAppSelector(getActiveProduct);
  const productStatus = useAppSelector(getActiveProductStatus);
  const comments = useAppSelector(getComments);

  const selectedSortItem = useAppSelector(getSortCommentsItem);
  const selectedSortItemSecond = useAppSelector(getSecondSortCommentsItem);
  const comentsStatus = useAppSelector(getCommentsStatus);

  let productId: string;
  if (id === undefined) {
    productId = '1';
  } else {
    productId = id;
  }

  useEffect(() => {
    dispatch(fetchActiveProductAction(productId));
    dispatch(fetchProductCommentsAction(productId));
  }, [dispatch, productId]);


  const sortedRatingsComments = SortRatingComments(comments, selectedSortItem);
  //сортировка по дате она работает, НО С СЕРВЕРА ПРИХОДЯТ ОДИНАКОВЫЕ ДАТЫ
  const sortedComments = SortDateComments(sortedRatingsComments, selectedSortItemSecond);

  const showComments = () => {
    if (comentsStatus === Status.Failed) {
      return <ProductCommentsError showComments={showComments} />;
    } else if (comentsStatus === Status.Loading) {
      return <LoadingScreen />;
    } else {
      if (comments.length === 0) {
        return <EmptyReviewResults />;
      }
      else if (sortedRatingsComments.length === 0) {
        return <EmptyProductFilterResult />;
      }
      else {
        return <Comments comments={sortedComments} selectedSortItem={selectedSortItem} />;
      }
    }
  };

  if (productStatus === Status.Failed) {
    return <NotFoundScreen />;
  }

  return (
    <Layout>
      <main>
        <div className="back-link">
          <div className="container">
            <a onClick={() => navigate(-1)} className="back-link__link links" >Назад
              <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
                <use xlinkHref="#icon-arrow-left"></use>
              </svg>
            </a>
          </div>
        </div>
        {product !== null && <ProductDetails product={product} openReview={openReview} setOpenReview={setOpenReview} />}
        {openReview && <ReviewForm roomId={productId} setOpenReview={setOpenReview} openReview={openReview} />}
        {showComments()}
      </main>
    </Layout>
  );
}

export default ProductPage;
