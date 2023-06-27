// import EmptyReviewResults from '../../components/empty-review-results/empty-review-results';
// import EmptyProductFilterResult from '../../components/empty-product-filter-result/empty-product-filter-result';
import FilterCommentsSort from '../../components/filter-comments-sort/filter-comments-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
// import ProductCommentsError from '../../components/product-comments-error/product-comments-error';
import ProductComments from '../../components/product-comments/product-comments';
import ProductDetails from '../../components/product-details/product-details';
import ReviewForm from '../../components/review-form/review-form';

function ProductPage(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        {/*       <h1 class="visually-hidden">Карточка: отзывов еще нет</h1> */}
        {/* <h1 class="visually-hidden">Карточка: пользователь не авторизован</h1> */}
        <h1 className="visually-hidden">Карточка: пользователь авторизован</h1>
        <div className="back-link">
          <div className="container">
            <a className="back-link__link" href="#">Назад
              <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
                <use xlinkHref="#icon-arrow-left"></use>
              </svg>
            </a>
          </div>
        </div>
        <ProductDetails />
        {/* нет ревью формы если не зареган */}
        <ReviewForm />
        {/* если отзывов нет  */}
        {/* <EmptyReviewResults /> */}
        <FilterCommentsSort />
        <ProductComments />
        {/* если по филттрам ничего не найдено */}
        {/* <EmptyProductFilterResult /> */}
        {/* ошибка в загрузке коментов */}
        {/* <ProductCommentsError /> */}
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
