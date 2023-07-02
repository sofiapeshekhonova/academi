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
        {/* т.к. сортирова по дате не возможна 1. у вас с сервера все коментарии приходят с одинаковой датой 2. нет общего списка коментариев,
          да, можно было взять все id, сложить их в массив один и идти по массиву и отправлять запросы на сервер, затем сложить все коментарии в общий массив
          но это займент слишком много времени, особенно если товаров тысячи
          поэтому я взяла рандомный товар и достала у него коментарий, если коментария нет, то перутся данные из констант */}
        {productsStatus === Status.Success ? <LastReview product={sortedProducts[0]}/> : ''}
        <Map />
      </main>
    </Layout>
  );
}

export default Index;
