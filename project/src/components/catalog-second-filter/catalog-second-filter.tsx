type PropsType = {
  itemRu: string;
  itemEn: string;
  filter: string[];
  checked: boolean;
  setFilter: (tab: string[]) => void;
  setChecked: (tab: boolean) => void;
}

function CatalogSecondFilter({ itemRu, itemEn, setFilter, filter, checked, setChecked }: PropsType) {

  // function handlePushItem() {

  //   //Array.prototype.push.apply(vegetables, moreVegs);
  //   //const x = filter.find((savedMovie) => savedMovie === itemEn)
  //   //console.log(filter.includes(itemEn))
  //   // if (filter.includes(itemEn)) {
  //   // // console.log('dsadd')
  //   //   setFilter(filter.filter((obj) => obj !== itemEn));
  //   // } else {
  //   //   setFilter(filter.concat(itemEn));
  //   // }
  //   setFilter(filter.concat(itemEn));
  // }

  const handlePushItem = () => {
    // if (filter.includes(itemEn)) {
    //   setFilter(filter.filter((obj) => obj !== itemEn));
    // return
    // }
    setFilter(filter.concat(itemEn));
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFilter((filter ) => [...filter, itemEn]);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const handlePushItem = () => {
  //   setFilter([...filter, itemEn,]);
  //   //storeData();
  // };

  // const handlePushItem = () => {
  //   setFilter(filter.map((item) => console.log(item)));
  //   // item.i === i ? { ...item, likes: itemEn } : item
  // };

  // const likeHandler = (id) => {
  //   setPosts(
  //     posts.map((item) =>
  //       item.id === id ? { ...item, likes: item.likes + 1 } : item
  //     )
  //   );
  // };

  //////сделать удаление чекбокса при переходе на другую ссылку
  return (
    <li className="catalog-filter__item catalog-filter__item--second-level" onClick={handlePushItem}>
      <div className="custom-toggle custom-toggle--checkbox">
        <input type="checkbox" value={itemRu} id={itemRu} name="catalog-second-level" defaultChecked={checked}/>
        <label className="custom-toggle__label" htmlFor={itemRu}>{itemRu}</label>
      </div>
    </li>
  );
}

export default CatalogSecondFilter;

