import { Link } from 'react-router-dom';
import { UserData } from '../../types/user/user';
import { AppRoute } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoritesProducts } from '../../store/products/selectors';

type PropsType = {
  user: UserData | null;
}

function HeaderAuth({user}: PropsType) {
  const favProducts = useAppSelector(getFavoritesProducts);

  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(logoutAction());
  }

  return (
    <>
      <div className="header__user-info-wrap">
        <div className="header__user-info">
          <div className="header__user-avatar">
            <picture>
              <source type="image/webp" srcSet={user?.avatarUrl} />
              <img src={user?.avatarUrl} srcSet={user?.avatarUrl} width="62" height="62" alt="Аватар пользователя." />
            </picture>
          </div>
          <p className="header__user-mail">{user?.email}</p>
        </div>
      </div>
      <div className="header__buttons">
        <Link to={AppRoute.Favourites} className="header__favourite">
          <span className="header__favourite-icon">
            <svg width="33" height="29" aria-hidden="true">
              <use xlinkHref="#icon-favourite"></use>
            </svg>
          </span>
          {favProducts.length > 0 && <span className="header__favourite-number">{favProducts.length}</span>}
          <span className="visually-hidden">Избранное</span>
        </Link>
        <div className="header__buttons-authorized">
          <div className="header__btn">
            <Link to={AppRoute.logIn} className="btn btn--second" onClick={handleClick}>Выйти</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderAuth;
