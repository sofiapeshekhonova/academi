import { useState } from 'react';
import { SecondSortRatingList, SortRatingList } from '../../constants';
import FilterItem from '../filter-item/filter-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCommentsSecondSort, changeCommentsSort } from '../../store/app/app';
import { getSecondSortCommentsItem } from '../../store/app/selectors';

type PropsType = {
  selectedSortItem: string;
}
function FilterCommentsSort({ selectedSortItem }: PropsType) {
  const dispatch = useAppDispatch();
  const selectedSortItemSecond = useAppSelector(getSecondSortCommentsItem);
  const [isOpenSortList, setIsOpenSortList] = useState(false);

  function handelOpenSortList() {
    setIsOpenSortList(true);
  }

  function handelChooseSort(item: string) {
    dispatch(changeCommentsSort(item));
    setIsOpenSortList(false);
  }

  function handleSelectSort(item: string) {
    dispatch(changeCommentsSecondSort(item));
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
                    <FilterItem key={item} item={item} handelChooseSort={handelChooseSort} selectedSortItem={selectedSortItem} />
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="filter-sort__sort-wrap">
            <h3 className="filter-sort__sort-title">Сортировать по дате</h3>
            <div className="filter-sort__sort-btns-wrap">
              {SecondSortRatingList.map((item) => (
                <button key={item.id}
                  className={`${item.className} ${item.id === selectedSortItemSecond ? 'filter-sort__sort-btn--active' : ''}`}
                  id={item.id} onClick={() => handleSelectSort(item.id)} type="button" aria-label={item.name}
                >
                  <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-chevron-top"></use>
                  </svg>
                </button>
              )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterCommentsSort;
