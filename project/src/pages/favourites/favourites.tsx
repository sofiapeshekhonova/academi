import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FoolFavorites from '../../components/fool-favorites/fool-favorites';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFavoritesProducts } from '../../store/products/selectors';


function Favourites(): JSX.Element {
  const favProducts = useAppSelector(getFavoritesProducts);
  return (
    <>
      <Header />
      {favProducts.length > 0 ? <FoolFavorites /> : <EmptyFavorites />}
      <Footer />
    </>
  );
}

export default Favourites;
