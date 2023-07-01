import { useRef} from 'react';

type PropsType = {
  itemRu: string;
  itemEn: string;
  filter: string[];
  setFilter: (tab: string[]) => void;
}

function CatalogSecondFilter({ itemRu, itemEn, setFilter, filter }: PropsType) {

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
    <li className="catalog-filter__item catalog-filter__item--second-level" >
      <div className="custom-toggle custom-toggle--checkbox">
        <input
          type="checkbox"
          value={itemRu}
          id={itemRu}
          name="catalog-second-level"
          ref={inputRef}
          checked={filter.includes(itemEn)}
          onChange={handlePushItem}
          // defaultChecked={checked}
        />
        <label className="custom-toggle__label" htmlFor={itemRu}>{itemRu}</label>
      </div>
    </li>
  );
}

export default CatalogSecondFilter;

