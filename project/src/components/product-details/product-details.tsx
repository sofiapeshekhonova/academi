import { useEffect, useState } from 'react';
import { AppRoute, AuthorizationStatus, STARS } from '../../constants';
import { ActiveProduct } from '../../types/product';
import Rating from '../rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoritesProducts } from '../../store/products/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { deleteFavoriteProductsAction, putFavoriteProductsAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  product: ActiveProduct;
  openReview: boolean;
  setOpenReview: (tab: boolean) => void;
}

function ProductDetails({ product, openReview, setOpenReview }: PropsType) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [length, setLength] = useState(140);
  const [description, setDescription] = useState(product.description);


  useEffect(() => {
    setDescription(product.description.slice(0, length));
  }, [length, product.description]);

  function handleMoreDescroptionButton() {
    setLength(product.description.length);
  }

  const favProducts = useAppSelector(getFavoritesProducts);
  const favProductsId = favProducts.map((i) => i.id);
  const isFavorite = favProductsId.includes(product.id);

  const buttonClassName = isFavorite === true ? 'item-details__like-button item-details__like-button--active' : 'item-details__like-button';
  const buttonText = isFavorite === true ? 'Добавить в избранное' : 'Удалить из избранного';
  const data = {
    productId: product.id,
  };
  function handleClick() {
    if (authorizationStatus === AuthorizationStatus.Auth && isFavorite !== true) {
      dispatch(putFavoriteProductsAction(data));
    } else if (authorizationStatus === AuthorizationStatus.Auth && isFavorite === true) {
      dispatch(deleteFavoriteProductsAction(data));
    } else {
      navigate(AppRoute.logIn);
    }
  }

  function handleСloseReviewClick() {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setOpenReview(!openReview);
    } else {
      navigate(AppRoute.logIn);
    }
  }

  return (
    // если нет коментариев или информация по кексам не найдена
    // <section className="item-details">
    <section className="item-details item-details--form-open" >
      <div className="container">
        <div className="item-details__wrapper">
          <div className="item-details__top-wrapper">
            <h2 className="item-details__name">{product.title}</h2>
            <span className="item-details__price">{product.price} р</span>
          </div>
          <div className="item-details__weight-wrapper">
            <span className="item-details__weight">{product.weight} грамм</span>
          </div>
          <div className="item-details__bottom-wrapper">
            <div className="item-details__image-wrapper">
              <picture>
                <source type="image/webp" srcSet={product.previewImageWebp} />
                <img src={product.previewImageWebp} srcSet={product.previewImageWebp} width="241" height="245" alt={product.title} />
              </picture>
              {product.isNew ? <span className="item-details__label">Новинка</span> : ''}
            </div>
            <div className="item-details__review-wrapper">
              <div className="star-rating star-rating--big">
                {/* нормально рейтинг вывести не получиться, т.к. отзывы до 5 звезд, а с сервера приходят рейтинг больше 5, скорее всего до 10 */}
                {STARS.map((star) => (
                  <Rating key={star.id} rating={product.rating} star={star.rating} starId={star.id} />
                ))}
                <span className="star-rating__count">{Math.round(product.reviewCount)}</span>
              </div>
              <div className="item-details__text-wrapper">
                <span className="item-details__text">{description}</span>
                {product.description.length > 140 && product.description.length !== length &&
                  <button className="item-details__more" onClick={handleMoreDescroptionButton}>
                    <span className="visually-hidden">Читать полностью</span>
                    <svg width="27" height="17" aria-hidden="true">
                      <use xlinkHref="#icon-more"></use>
                    </svg>
                  </button>}
              </div>
              <div className="item-details__button-wrapper">
                <button className={buttonClassName} onClick={handleClick}>
                  <svg width="45" height="37" aria-hidden="true">
                    <use xlinkHref="#icon-like"></use>
                  </svg>
                  <span className="visually-hidden">{buttonText}</span>
                </button>
                <button className="btn btn--second" type="button" onClick={handleСloseReviewClick}>
                  {openReview ? 'Отменить отзыв' : 'Оставить отзыв'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetails;
