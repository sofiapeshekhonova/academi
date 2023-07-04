import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants';

function EmptyFavorites() {
  const navigate = useNavigate();

  return (
    <main>
      <h1 className="visually-hidden">Каталог товаров</h1>
      <div className="back-link">
        <div className="container">
          <a onClick={() => navigate(-1)} className="back-link__link" >Назад
            <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
              <use xlinkHref="#icon-arrow-left"></use>
            </svg>
          </a>
        </div>
      </div>
      <section className="empty-favorites">
        <h2 className="visually-hidden">Избранные товары</h2>
        <div className="container">
          <div className="empty-favorites__bg-wrapper">
            <div className="empty-favorites__wrapper">
              <svg width="944" height="707" aria-hidden="true">
                <use xlinkHref="#icon-empty-favorites-cloud"></use>
              </svg>
              <div className="empty-favorites__content">
                <p className="empty-favorites__text">Кажется, пока вы не добавили ни одного кекса</p>
                <div className="empty-favorites__button-wrapper">
                  <Link to={AppRoute.Catalog} className="btn" >К кексам</Link>
                </div>
              </div>
            </div>
            <div className="empty-favorites__img-wrapper">
              <img src="img/svg/bg-keks-empty-favorites.svg" width="680" height="687" alt="Картика кота." />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EmptyFavorites;
