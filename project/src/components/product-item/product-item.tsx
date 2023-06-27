import { Product } from '../../types/product';

type Props = {
  product: Product;
}

function ProductItem({ product }: Props) {

  const buttonClassName = product.isFavorite === true ? 'card-item__favorites card-item__favorites--active' : 'card-item__favorites';
  const buttonText = product.isFavorite === true ? 'Добавить в избранное' : 'Удалить из избранного';
  return (
    <li className="random-main__item">
      <div className="card-item">
        <a className="card-item__img-link" href="#">
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
        </a>
        <button className={buttonClassName}>
          <span className="visually-hidden">{buttonText}</span>
          <svg width="51" height="41" aria-hidden="true">
            <use xlinkHref="#icon-like"></use>
          </svg>
        </button>
        <a className="card-item__link" href="#">
          <h3 className="card-item__title"><span>{product.title}</span></h3>
        </a>
      </div>
    </li>
  );
}

export default ProductItem;
