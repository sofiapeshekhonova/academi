import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
// import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Index from '../../pages/index';
import SignUp from '../../pages/sign-up/sign-up';
import LogIn from '../../pages/log-in/log-in';
import Catalog from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product-page/product-page';
import Favourites from '../../pages/favourites/favourites';

function App(): JSX.Element {

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Index} element={<Index />} />
        <Route path={AppRoute.SignUp} element={<SignUp />} />
        <Route path={AppRoute.logIn} element={<LogIn />} />
        <Route path={AppRoute.Catalog} element={<Catalog />} />
        <Route path={AppRoute.ProductPage} element={<ProductPage />} />
        <Route path={AppRoute.Favourites} element={<Favourites />} />
        {/* <Route path={AppRoute.Film} element={<Film />}>
          <Route path={AppRoute.Info} element={<Film />} />
        </Route> */}
        <Route path={AppRoute.NotFoundPage} element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
