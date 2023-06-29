import { Link } from 'react-router-dom';
//import { AppRoute } from '../../constants';
import { Product } from '../../types/product';

type Props = {
  product: Product;
}

function ProductItem({ product }: Props) {
  const { id } = product;
  const productId = `/ProductPage/${id}`;

  const buttonClassName = product.isFavorite === true ? 'card-item__favorites card-item__favorites--active' : 'card-item__favorites';
  const buttonText = product.isFavorite === true ? 'Добавить в избранное' : 'Удалить из избранного';
  return (
    <li className="random-main__item">
      <div className="card-item">
        <Link to={productId} className="card-item__img-link">
          <div className="card-item__img-wrapper">
            <picture>
              <source type="image/webp" srcSet={product.previewImageWebp} />
              {/* <source type="image/webp" srcSet="img/content/blueberry-cake.webp, img/content/blueberry-cake@2x.webp 2x" /> */}
              <img src={product.previewImageWebp}
                // srcSet="img/content/blueberry-cake@2x.jpg 2x"
                srcSet={product.previewImageWebp} width="241" height="245" alt={product.title}
              />
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
        <Link to={productId} className="card-item__link">
          <h3 className="card-item__title"><span>{product.title}</span></h3>
        </Link>
      </div>
    </li>
  );
}

export default ProductItem;
