import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { deleteFavoriteProductsAction, putFavoriteProductsAction } from '../../store/api-actions';
import { getFavoritesProducts } from '../../store/products/selectors';

type PropsType = {
  product: Product;
}

function CatalogItem({ product }: PropsType) {
  const { id } = product;
  const navigate = useNavigate();
  const productId = `/ProductPage/${id}`;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favProducts = useAppSelector(getFavoritesProducts);
  const favProductsId = favProducts.map((i) => i.id);
  const isFavorite = favProductsId.includes(product.id);


  const buttonClassName = isFavorite === true ? 'card-item__favorites card-item__favorites--active' : 'card-item__favorites';
  const buttonText = isFavorite === true ? 'Добавить в избранное' : 'Удалить из избранного';
  const price = product.price.toLocaleString('ru');

  const data = {
    productId: product.id
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
    <li className="catalog__item">
      <div className="card-item card-item--big">
        <Link to={productId} className="card-item__img-link">
          <div className="card-item__img-wrapper">
            <picture>
              <source type="image/webp" srcSet={product.previewImageWebp} />
              <img src={product.previewImageWebp} srcSet={product.previewImageWebp} width="326" height="332" alt="Торт голубика." />
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
        <span className="card-item__price">{price}</span>
        <Link to={productId} className="card-item__link">
          <h3 className="card-item__title"><span>{product.title}</span></h3>
        </Link>
      </div>
    </li>
  );
}

export default CatalogItem;
