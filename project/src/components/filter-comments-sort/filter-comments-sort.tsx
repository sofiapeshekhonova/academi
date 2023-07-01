import { useState } from 'react';
import { SortRatingList } from '../../constants';
import FilterItem from '../filter-item/filter-item';
import { useAppDispatch } from '../../hooks';
import { changeCommentsSort } from '../../store/app/app';

type PropsType = {
  selectedSortItem: string;
}
function FilterCommentsSort({selectedSortItem}: PropsType) {
  const dispatch = useAppDispatch();
  const [isOpenSortList, setIsOpenSortList] = useState(false);
  const [button, setButton] = useState(true);
  const [secondButton, setSecondButton] = useState(false);

  function handelOpenSortList() {
    setIsOpenSortList(true);
  }

  function handelChooseSort(item: string) {
    dispatch(changeCommentsSort(item));
    setIsOpenSortList(false);
  }


  const classNameButtonFirst = `filter-sort__sort-btn filter-sort__sort-btn--inc ${button ? 'filter-sort__sort-btn--active' : ''}`;
  const classNameButtonSecond = `filter-sort__sort-btn filter-sort__sort-btn--desc ${secondButton ? 'filter-sort__sort-btn--active' : ''}`;
  function handleSelectDescendingSort() {
    setButton(false);
    setSecondButton(true);
  }

  function handleSelectSort() {
    setSecondButton(false);
    setButton(true);
  }

  return (
    <div className="filter-sort">
      <div className="container">
        <div className="filter-sort__inner">
          <div className="filter-sort__filter-wrap">
            <h3 className="filter-sort__filter-title">Показать с рейтингом</h3>
            <div className="filter-sort__filter">
              <button className="filter-sort__filter-btn" type="button" onMouseEnter={handelOpenSortList}>{selectedSortItem}
                <svg className="filter-sort__filter-icon" width="14" height="15" aria-hidden="true">
                  <use xlinkHref="#icon-polygon"></use>
                </svg>
              </button>
              {isOpenSortList && (
                <ul className="filter-sort__filter-list" >
                  {SortRatingList.map((item) =>
                    <FilterItem key={item} item={item} handelChooseSort={handelChooseSort} selectedSortItem={selectedSortItem}/>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="filter-sort__sort-wrap">
            <h3 className="filter-sort__sort-title">Сортировать по дате</h3>
            <div className="filter-sort__sort-btns-wrap">
              <button className={classNameButtonFirst} onClick={handleSelectSort}
                type="button" aria-label="сортировка по возрастанию"

              >
                <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-chevron-top"></use>
                </svg>
              </button>
              <button className={classNameButtonSecond}
                type="button" aria-label="сортировка по убыванию"
                onClick={handleSelectDescendingSort}
              >
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
