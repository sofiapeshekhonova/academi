import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

type PropsType ={
  product: Product;
}

function CatalogItem({product}: PropsType) {
  const { id } = product;
  const productId = `/ProductPage/${id}`;

  const buttonClassName = product.isFavorite === true ? 'card-item__favorites card-item__favorites--active' : 'card-item__favorites';
  const buttonText = product.isFavorite === true ? 'Добавить в избранное' : 'Удалить из избранного';

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
        <button className={buttonClassName}>
          <span className="visually-hidden">{buttonText}</span>
          <svg width="51" height="41" aria-hidden="true">
            <use xlinkHref="#icon-like"></use>
          </svg>
        </button>
        <span className="card-item__price">{product.price} p</span>
        <Link to={productId} className="card-item__link">
          <h3 className="card-item__title"><span>{product.title}</span></h3>
        </Link>
      </div>
    </li>
  );
}

export default CatalogItem;
