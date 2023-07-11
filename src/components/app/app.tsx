import { Navigate, Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../constants';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Index from '../../pages/index';
import Login from '../../pages/login/login';
import Catalog from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product-page/product-page';
import Favourites from '../../pages/favourites/favourites';
import RegisterPage from '../../pages/register-page/register-page';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path='/' element={<Navigate to={AppRoute.Index} />} />
          <Route path={AppRoute.ProductPage} element={<ProductPage />} />
          <Route path={AppRoute.Index} element={<Index />} />
          <Route path={AppRoute.SignUp} element={<RegisterPage />} />
          <Route path={AppRoute.logIn} element={<Login />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={AppRoute.Favourites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Favourites />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.NotFoundPage} element={<NotFoundScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
