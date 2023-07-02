import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../constants';

function NotFoundScreen(): JSX.Element {
  return (
    <Layout>
      <h1 className="visually-hidden">404</h1>
      <section className="error-page">
        <div className="container">
          <h2 className="error-page__title">404</h2>
          <p className="error-page__message">Страница не найдена</p>
          <p className="error-page__text">Она была удалена<br />или<br />вы&nbsp;указали неправильный адрес.</p>
          <div className="error-page__button">
            <Link to={AppRoute.Index} className="btn btn--large">Вернуться&nbsp;на&nbsp;главную</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NotFoundScreen;
