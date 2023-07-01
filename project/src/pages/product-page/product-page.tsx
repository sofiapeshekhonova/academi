import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
// import ProductCommentsError from '../../components/product-comments-error/product-comments-error';
import ProductDetails from '../../components/product-details/product-details';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchActiveProductAction, fetchProductCommentsAction } from '../../store/api-actions';
import { getActiveProduct } from '../../store/product/selectors';
import { SortCards, Status } from '../../constants';
import { getSortComments } from '../../store/app/selectors';
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

  const commentss = [
    {
      'id': '464cc196-b9e9-466d-bef6-a763a2ae31cf',
      'positive': 'Сочный микс урашений на классической основе',
      'negative': 'Сочный микс урашений на классической основе',
      'rating': 5,
      'user': {
        'name': 'соня',
        'avatarUrl': 'https://grading.design.pages.academy/static/keks/avatar/default.jpg'
      },
      'isoDate': '2023-06-20T16:18:31.725Z'
    },
    {
      'id': '69939723-e5b3-43f0-8f7b-d3c4ad353a2f',
      'positive': 'Сочный микс урашений на классической основе',
      'negative': 'Сочный микс урашений на классической основе',
      'rating': 3,
      'user': {
        'name': 'соня',
        'avatarUrl': 'https://grading.design.pages.academy/static/keks/avatar/default.jpg'
      },
      'isoDate': '2023-06-30T19:18:31.725Z'
    },
  ];
  const selectedSortItem = useAppSelector(getSortComments);
  const comentsStatus = useAppSelector(getCommentsStatus);
  const sortComments = SortCards(commentss, selectedSortItem);

  const showComments = () => {
    if (comentsStatus === Status.Failed) {
      return <ProductCommentsError />;
    } else if (comentsStatus === Status.Loading) {
      return <LoadingScreen />;
    } else {
      if (comments.length === 0) {
        return <EmptyReviewResults />;
      } else if (sortComments.length === 0) {
        return <EmptyProductFilterResult />;
      } else {
        return <Comments comments={sortComments} selectedSortItem={selectedSortItem} />;
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
