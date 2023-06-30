import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
// import ProductCommentsError from '../../components/product-comments-error/product-comments-error';
import ProductDetails from '../../components/product-details/product-details';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchActiveProductAction, fetchProductCommentsAction } from '../../store/api-actions';
import { getActiveProduct } from '../../store/product/selectors';
import { AuthorizationStatus, SortCards } from '../../constants';
import { getSortComments } from '../../store/app/selectors';
import EmptyProductFilterResult from '../../components/empty-product-filter-result/empty-product-filter-result';
import Comments from '../../components/comments/comments';
import EmptyReviewResults from '../../components/empty-review-results/empty-review-results';
import './product-page.css';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getComments } from '../../store/comments/selectors';

function ProductPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productId = useParams().id;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  //не обновляется страница, доделать
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
  const selectedSortItem = useAppSelector(getSortComments);
  const sortComments = SortCards(comments, selectedSortItem);
  const showComments = () => {
    if (comments.length === 0) {
      return <EmptyReviewResults />;
    } else if (sortComments.length === 0) {
      return <EmptyProductFilterResult />;
    } else {
      return <Comments comments={sortComments} selectedSortItem={selectedSortItem}/>;
    }
    ///тут еще добавить если общика в загрузке /* <ProductCommentsError /> */
  };

  return (
    <>
      <Header />
      <main>
        {/* <h1 class="visually-hidden">Карточка: отзывов еще нет</h1> */}
        {/* <h1 class="visually-hidden">Карточка: пользователь не авторизован</h1> */}
        {/* <h1 className="visually-hidden">Карточка: пользователь авторизован</h1> */}
        <div className="back-link">
          <div className="container">
            <a onClick={() => navigate(-1)} className="back-link__link links" >Назад
              <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
                <use xlinkHref="#icon-arrow-left"></use>
              </svg>
            </a>
          </div>
        </div>
        {product !== null && <ProductDetails product={product} />}
        {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm roomId={x} />}
        {showComments()}
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
