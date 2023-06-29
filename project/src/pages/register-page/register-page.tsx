import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import RegisterForm from '../../components/register-form/register-form';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selectors';

function RegisterPage(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);

  if (authStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Index} />
    );
  }

  return (
    <section className="register-page">
      <div className="register-page__header">
        <div className="register-page__img-wrap">
          <img className="register-page__img" src="img/svg/hero-keks.svg" width="727" height="569" alt="Картика кота." />
        </div>
      </div>
      <div className="register-page__content">
        <div className="register-page__inner">
          <h1 className="register-page__title">Регистрация</h1>
          <div className="register-page__form">
            <RegisterForm />
          </div>
          <p className="register-page__text-wrap">Уже зарегистрированы?
            <Link to={AppRoute.logIn} className="register-page__link">Войдите </Link> в свой аккаунт.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
