import { SORT_RATING_LIST } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { changeCommentsSort } from '../../store/app/app';

function EmptyProductFilterResult() {
  const dispatch = useAppDispatch();

  function handleTurnFilterOf() {
    dispatch(changeCommentsSort(SORT_RATING_LIST[0]));
  }

  return (
    <section className="empty-results empty-results--has-sort">
      <div className="container">
        <div className="empty-results__wrapper">
          <h2 className="empty-results__title">По вашему запросу информации не найдено</h2>
          <button className="btn btn--second empty-results__button" type="button" onClick={handleTurnFilterOf}>Сбросить фильтры</button>
          <svg width="180" height="166" aria-hidden="true">
            <use xlinkHref="#icon-cake"></use>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default EmptyProductFilterResult;
