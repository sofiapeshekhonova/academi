import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FoolFavorites from '../../components/fool-favorites/fool-favorites';
import ErrorPage from '../error-page/error-page';
import Layout from '../../components/layout/layout';
import { Status } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getFavoritesProducts, getFavoritesStatus } from '../../store/products/selectors';

function Favourites(): JSX.Element {
  const favProducts = useAppSelector(getFavoritesProducts);
  const favProductsStatus = useAppSelector(getFavoritesStatus);

  if (favProductsStatus === Status.Failed) {
    return <ErrorPage />;
  }

  return (
    <Layout title='- Избранное'>
      {favProducts.length > 0 ? <FoolFavorites /> : <EmptyFavorites />}
    </Layout>
  );
}

export default Favourites;
