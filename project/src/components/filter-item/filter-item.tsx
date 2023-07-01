type PropsType = {
  item: string;
  handelChooseSort: (tab: string) => void;
  selectedSortItem: string;
}

function FilterItem({item, handelChooseSort, selectedSortItem}: PropsType) {
  return (
    <li className="filter-sort__filter-item" onClick={() => handelChooseSort(item)}>
      <div className="custom-toggle custom-toggle--sorting" >
        <input type="radio" id={item} name={item} defaultChecked={item === selectedSortItem}/>
        <label className="custom-toggle__label" htmlFor={item} >{item}</label>
      </div>
    </li>
  );
}

export default FilterItem;
