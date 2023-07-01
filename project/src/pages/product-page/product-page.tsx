import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductDetails from '../../components/product-details/product-details';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchActiveProductAction, fetchProductCommentsAction } from '../../store/api-actions';
import { getActiveProduct } from '../../store/product/selectors';
import { SortCards, SortDateComments, Status } from '../../constants';
import { getSecondSortCommentsItem, getSortCommentsItem } from '../../store/app/selectors';
import EmptyProductFilterResult from '../../components/empty-product-filter-result/empty-product-filter-result';
import Comments from '../../components/comments/comments';
import EmptyReviewResults from '../../components/empty-review-results/empty-review-results';
import './product-page.css';
import { getComments, getCommentsStatus } from '../../store/comments/selectors';
import ProductCommentsError from '../../components/product-comments-error/product-comments-error';
import LoadingScreen from '../loading-screen/loading-screen';

function ProductPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productId = useParams().id;
  const [openReview, setOpenReview] = useState(false);

  let x: string;
  if (productId === undefined) {
    x = '1';
  } else {
    x = productId;
  }

  useEffect(() => {
    dispatch(fetchActiveProductAction(x));
    dispatch(fetchProductCommentsAction(x));
  }, [dispatch, x]);

  const product = useAppSelector(getActiveProduct);
  const comments = useAppSelector(getComments);

  const selectedSortItem = useAppSelector(getSortCommentsItem);
  const selectedSortItemSecond = useAppSelector(getSecondSortCommentsItem);
  const comentsStatus = useAppSelector(getCommentsStatus);

  const sortedRatingsComments = SortCards(comments, selectedSortItem);
  //сортировка по дате она работает, НО С СЕРВЕРА ПРИХОДЯТ ОДИНАКОВЫЕ ДАТЫ
  const sortedComments = SortDateComments(sortedRatingsComments, selectedSortItemSecond);


  const showComments = () => {
    if (comentsStatus === Status.Failed) {
      return <ProductCommentsError />;
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

  return (
    <>
      <Header />
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
        {openReview && <ReviewForm roomId={x} setOpenReview={setOpenReview} openReview={openReview}/>}
        {showComments()}
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
