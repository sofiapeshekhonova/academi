// import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FoolFavorites from '../../components/fool-favorites/fool-favorites';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

//только авторизованным
function Favourites(): JSX.Element {
  return (
    <>
      <Header />
      {/* если не пусто показывай одно, если пусто другое */}
      <FoolFavorites />
      {/* <EmptyFavorites /> */}
      <Footer />
    </>
  );
}

export default Favourites;
