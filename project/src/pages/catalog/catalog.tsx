import { useState } from 'react';
import CatalogSecondFilter from '../../components/catalog-second-filter/catalog-second-filter';
import ComponentsItems from '../../components/components-items/components-items';
import { CatalogFilterList, CatalogList, SortCatalog, Status } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCatalogSort } from '../../store/app/app';
import { getSortCatalog } from '../../store/app/selectors';
import { getProducts, getStatus } from '../../store/products/selectors';
import CatalogNotFound from '../../components/catalog-not-found/catalog-not-found';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import { Product } from '../../types/product';
import Layout from '../../components/layout/layout';

function Catalog(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const productsStatus = useAppSelector(getStatus);
  const selectedSorCatalog = useAppSelector(getSortCatalog);
  let res: Product[];
  let sortProducts;
  const [filter, setFilter] = useState<string[] | never>([]);
  let catalogSecondFilterList;
  if (selectedSorCatalog === 'null') {
    sortProducts = products;
  } else {
    sortProducts = SortCatalog(products, selectedSorCatalog);
    catalogSecondFilterList = CatalogList.filter((i) => i.name === selectedSorCatalog)[0].type;
  }

  if (filter.length === 0) {
    res = sortProducts;
  } else {
    res = sortProducts.filter((product) => filter.some((tag) => (product.type.includes(tag))));
  }


  function handleChangeSort(item: string) {
    if(item === selectedSorCatalog) {
      dispatch(changeCatalogSort('null'));
      setFilter([]);
    } else {
      dispatch(changeCatalogSort(item));
      setFilter([]);

    }
  }

  return (
    <Layout>
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
                  {CatalogFilterList.map((item) => (
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
              {selectedSorCatalog !== 'null' &&
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
          {res.length !== 0 ? <ComponentsItems products={res} /> : <CatalogNotFound />}
        </main>}
    </Layout>
  );
}

export default Catalog;
