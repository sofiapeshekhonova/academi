import { useCallback, useState } from 'react';
import { Product } from '../../types/product';
import CatalogItem from '../catalog-item/catalog-item';

type PropsType = {
  products: Product[];
}

function ComponentsItems({products}: PropsType) {

  const [countProducts, setCountProducts] = useState(6);

  const handleShoeMoreButton = useCallback(() => {
    if (products.length !== 0) {
      setCountProducts(countProducts + 6);
    }
  }, [countProducts, products.length]);

  function handleBegginingClick() {
    window.scrollTo(0, 0);
    setCountProducts(6);
  }

  return (
    <section className="catalog">
      <div className="container">
        <h2 className="visually-hidden">Каталог</h2>
        <div className="catalog__wrapper">
          <ul className="catalog__list">
            {products.slice(0,countProducts).map((product) => (
              <CatalogItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="catalog__button-wrapper">
            {products.length > 6 && countProducts !== products.length && countProducts < products.length &&
            <button className="btn btn--second" type="button" onClick={handleShoeMoreButton}>Показать еще</button>}
            {products.length !== 0 && countProducts > products.length &&
            <button className="btn btn--second" type="button" onClick={handleBegginingClick}>в начало</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComponentsItems;

