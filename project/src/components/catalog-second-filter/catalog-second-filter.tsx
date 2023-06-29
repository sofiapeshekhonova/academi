import { useRef } from 'react';

type PropsType = {
  itemRu: string;
  itemEn: string;
  filter: string[];
  checked: boolean;
  setFilter: (tab: string[]) => void;
  setChecked: (tab: boolean) => void;
}

function CatalogSecondFilter({ itemRu, itemEn, setFilter, filter, checked, setChecked }: PropsType) {

  const inputRef = useRef<HTMLInputElement>(null);
  const handlePushItem = () => {
    if( inputRef.current !== null) {
      if (inputRef.current !== undefined && inputRef.current.checked) {
        setFilter(filter.concat(itemEn));
      } else {
        setFilter(filter.filter((obj) => obj !== itemEn));
      }
    }
  };

  return (
    <li className="catalog-filter__item catalog-filter__item--second-level" onClick={handlePushItem}>
      <div className="custom-toggle custom-toggle--checkbox">
        <input
          type="checkbox"
          value={itemRu}
          id={itemRu}
          name="catalog-second-level"
          defaultChecked={checked}
          ref={inputRef}
        />
        <label className="custom-toggle__label" htmlFor={itemRu}>{itemRu}</label>
      </div>
    </li>
  );
}

export default CatalogSecondFilter;

