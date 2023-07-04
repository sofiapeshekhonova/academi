import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import CatalogSecondFilter from '../../components/catalog-second-filter/catalog-second-filter';
import ComponentsItems from '../../components/components-items/components-items';
import CatalogNotFound from '../../components/catalog-not-found/catalog-not-found';
import Layout from '../../components/layout/layout';
import { CATALOG_FITER_LIST, CATALOG_LIST, Status } from '../../constants';
import { SortProductsByCategory } from '../../untils/sort-products';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../../types/product';
import { changeCatalogSort } from '../../store/app/app';
import { getSortCatalog } from '../../store/app/selectors';
import { getProducts, getStatus } from '../../store/products/selectors';

function Catalog(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useAppSelector(getProducts);
  const productsStatus = useAppSelector(getStatus);
  const selectedSorCatalog = useAppSelector(getSortCatalog);

  const [filter, setFilter] = useState<string[] | never>([]);
  let sortProductsFinal: Product[];
  let sortProducts;

  let catalogSecondFilterList;

  if (selectedSorCatalog === '') {
    sortProducts = products;
  } else {
    sortProducts = SortProductsByCategory(products, selectedSorCatalog);
    catalogSecondFilterList = CATALOG_LIST.filter((i) => i.name === selectedSorCatalog)[0].type;
  }

  if (filter.length === 0) {
    sortProductsFinal = sortProducts;
  } else {
    sortProductsFinal = sortProducts.filter((product) => filter.some((tag) => (product.type.includes(tag))));
  }

  function handleChangeSort(item: string) {
    if (item === selectedSorCatalog) {
      dispatch(changeCatalogSort(''));
      setFilter([]);
    } else {
      dispatch(changeCatalogSort(item));
      setFilter([]);
    }
  }

  return (
    <Layout title='- Карточка товара.'>
      {productsStatus === Status.Failed ? <ErrorPage /> :
        <main>
          <h1 className="visually-hidden">Каталог товаров</h1>
          <div className="back-link">
            <div className="container">
              <a onClick={() => navigate(-1)} className="back-link__link" >Назад
                <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-left"></use>
                </svg>
              </a>
            </div>
          </div>
          <div className="catalog-filter">
            <div className="container">
              <div className="catalog-filter__first-level">
                <h3 className="catalog-filter__title catalog-filter__title--first-level">основы</h3>
                <ul className="catalog-filter__list catalog-filter__list--first-level">
                  {CATALOG_FITER_LIST.map((item) => (
                    <li className="catalog-filter__item catalog-filter__item--first-level" key={item}>
                      <button
                        className={`${item === selectedSorCatalog ? 'is-active' : ''} btn btn--filter-first-level`}
                        type="button" onClick={() => handleChangeSort(item)}
                      >{item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedSorCatalog !== '' &&
                <div className="catalog-filter__second-level">
                  <h3 className="catalog-filter__title catalog-filter__title--second-level">начинки</h3>
                  <ul className="catalog-filter__list catalog-filter__list--second-level">
                    {catalogSecondFilterList !== undefined &&
                      catalogSecondFilterList.map((item) => (
                        <CatalogSecondFilter key={item.ru}
                          itemRu={item.ru} itemEn={item.en} setFilter={setFilter} filter={filter}
                        />
                      ))}
                  </ul>
                </div>}
            </div>
          </div>
          {sortProductsFinal.length !== 0 ? <ComponentsItems products={sortProductsFinal} /> : <CatalogNotFound />}
        </main>}
    </Layout>
  );
}

export default Catalog;
