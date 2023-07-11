import { Link } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import RandomProductsList from '../../components/random-products-list/random-products-list';
import Map from '../../components/map/map';
import Layout from '../../components/layout/layout';
import { AppRoute, Status } from '../../constants';
import { useAppSelector } from '../../hooks';
import { SortProductsRandom } from '../../untils/sort-products';
import { getProducts, getStatus } from '../../store/products/selectors';
import LastReview from '../../components/last-review/last-review';

function Index(): JSX.Element {
  const products = useAppSelector(getProducts);
  const productsCopy = products.slice(0);
  const productsStatus = useAppSelector(getStatus);
  const sortedProducts = SortProductsRandom(productsCopy);

  return (
    <Layout title='- Главная'>
      <main>
        <div className="hero">
          <div className="container">
            <div className="hero__img-wrapper">
              <img className="hero__img" src="img/svg/hero-keks.svg" width="727" height="569" alt="Картика кота." />
            </div>
            <div className="hero__wrapper">
              <p className="hero__subtitle">Твоя пушистая кондитерская</p>
              <p className="hero__title">КЕКС</p>
              <div className="hero__button-wrapper">
                <Link to={AppRoute.Catalog} className="btn">Скорее смотреть</Link>
              </div>
            </div>
          </div>
        </div>
        <section className="random-main">
          <div className="container">
            <h2 className="random-main__title">кексы</h2>
            {productsStatus === Status.Loading ? <LoadingScreen /> : <RandomProductsList products={sortedProducts} />}
          </div>
        </section>
        <LastReview />
        <Map />
      </main>
    </Layout>
  );
}

export default Index;
