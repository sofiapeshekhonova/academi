function FilterCommentsSort() {
  return (
    <div className="filter-sort">
      <div className="container">
        <div className="filter-sort__inner">
          <div className="filter-sort__filter-wrap">
            <h3 className="filter-sort__filter-title">Показать с рейтингом</h3>
            <div className="filter-sort__filter">
              <button className="filter-sort__filter-btn" type="button">Любой
                <svg className="filter-sort__filter-icon" width="14" height="15" aria-hidden="true">
                  <use xlinkHref="#icon-polygon"></use>
                </svg>
              </button>
              <ul className="filter-sort__filter-list">
                <li className="filter-sort__filter-item">
                  <div className="custom-toggle custom-toggle--sorting">
                    <input type="radio" id="review-sort-1" name="review-sort" checked />
                    <label className="custom-toggle__label" htmlFor="review-sort-1">Любой</label>
                  </div>
                </li>
                <li className="filter-sort__filter-item">
                  <div className="custom-toggle custom-toggle--sorting">
                    <input type="radio" id="review-sort-2" name="review-sort" />
                    <label className="custom-toggle__label" htmlFor="review-sort-2">Высокий</label>
                  </div>
                </li>
                <li className="filter-sort__filter-item">
                  <div className="custom-toggle custom-toggle--sorting">
                    <input type="radio" id="review-sort-3" name="review-sort" />
                    <label className="custom-toggle__label" htmlFor="review-sort-3">Низкий</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="filter-sort__sort-wrap">
            <h3 className="filter-sort__sort-title">Сортировать по дате</h3>
            <div className="filter-sort__sort-btns-wrap">
              <button className="filter-sort__sort-btn filter-sort__sort-btn--inc filter-sort__sort-btn--active" type="button" aria-label="сортировка по возрастанию">
                <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-chevron-top"></use>
                </svg>
              </button>
              <button className="filter-sort__sort-btn filter-sort__sort-btn--desc" type="button" aria-label="сортировка по убыванию">
                <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-chevron-top"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterCommentsSort;
