import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { deleteFavoriteProductsAction, putFavoriteProductsAction } from '../../store/api-actions';
import { getFavoritesProducts } from '../../store/products/selectors';

type Props = {
  product: Product;
}

function ProductItem({ product }: Props) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = product;
  const productId = `/ProductPage/${id}`;
  const favProducts = useAppSelector(getFavoritesProducts);
  const favProductsId = favProducts.map((i) => i.id);
  const isFavorite = favProductsId.includes(product.id);
  const buttonClassName = isFavorite === true ? 'card-item__favorites card-item__favorites--active' : 'card-item__favorites';
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

  return (
    <li className="random-main__item">
      <div className="card-item">
        <Link to={productId} className="card-item__img-link">
          <div className="card-item__img-wrapper">
            <picture>
              <source type="image/webp" srcSet={product.previewImageWebp} />
              <img src={product.previewImageWebp}
                srcSet={product.previewImageWebp} width="241" height="245" alt={product.title}
              />
            </picture>
          </div>
          {product.isNew === true ? <span className="card-item__label">Новинка</span> : ''}
        </Link>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="visually-hidden">{buttonText}</span>
          <svg width="51" height="41" aria-hidden="true">
            <use xlinkHref="#icon-like"></use>
          </svg>
        </button>
        <Link to={productId} className="card-item__link">
          <h3 className="card-item__title"><span>{product.title}</span></h3>
        </Link>
      </div>
    </li>
  );
}

export default ProductItem;
