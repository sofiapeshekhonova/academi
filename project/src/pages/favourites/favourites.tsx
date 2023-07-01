import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FoolFavorites from '../../components/fool-favorites/fool-favorites';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks';
import { getFavoritesProducts } from '../../store/products/selectors';

function Favourites(): JSX.Element {
  const favProducts = useAppSelector(getFavoritesProducts);
  return (
    <Layout>
      {favProducts.length > 0 ? <FoolFavorites /> : <EmptyFavorites />}
    </Layout>
  );
}

export default Favourites;
