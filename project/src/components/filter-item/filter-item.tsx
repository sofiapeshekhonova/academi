import { useState } from 'react';

type PropsType = {
  item: string;
  handelChooseSort: (tab: string) => void;
  selectedSortItem: string;
}

function FilterItem({item, handelChooseSort, selectedSortItem}: PropsType) {
  /////////////////////////////// подумать над cheacked
  const [checked, setChecked] = useState(true);

  function chengeCheckbox() {
    if(item === selectedSortItem) {
      setChecked(true);
    }

  }
  //console.log(item)
  return (
    <li className="filter-sort__filter-item" onClick={() => handelChooseSort(item)}>
      <div className="custom-toggle custom-toggle--sorting" >
        <input type="radio" id={item} name="review-sort" checked={checked} onChange={chengeCheckbox}/>
        <label className="custom-toggle__label" htmlFor={item} >{item}</label>
      </div>
    </li>
  );

}

export default FilterItem;
