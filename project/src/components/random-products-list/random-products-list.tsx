import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import ProductItem from '../product-item/product-item';
import { AppRoute } from '../../constants';

type Props = {
  products: Product[];
}
function RandomProductsList({ products }: Props) {
  const slice = products.slice(0, 3);

  return (
    <ul className="random-main__list">
      {slice.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
      <li className="random-main__item">
        <Link to={AppRoute.Catalog} className="random-main__link">
          <div className="random-main__icon-wrapper">
            <div className="random-main__icon">
              <svg width="120" height="130" aria-hidden="true">
                <use xlinkHref="#icon-keks"></use>
              </svg>
            </div>
          </div>
          <h3 className="random-main__subtitle">Все кексы</h3>
        </Link>
      </li>
    </ul>
  );
}
export default RandomProductsList;
