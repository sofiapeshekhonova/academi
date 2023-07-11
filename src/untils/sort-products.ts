import { CATALOG_FITER_LIST, CATALOG_FITER_LIST_EN } from '../constants';
import { Product } from '../types/product';

export function SortProductsByCategory(products: Product[], sortListItem: string) {
  switch (sortListItem) {
    case CATALOG_FITER_LIST[0]:
      return products.slice().filter((i) => i.category === CATALOG_FITER_LIST_EN[0]);
    case CATALOG_FITER_LIST[1]:
      return products.slice().filter((i) => i.category === CATALOG_FITER_LIST_EN[1]);
    case CATALOG_FITER_LIST[2]:
      return products.slice().filter((i) => i.category === CATALOG_FITER_LIST_EN[2]);
    case CATALOG_FITER_LIST[3]:
      return products.slice().filter((i) => i.category === CATALOG_FITER_LIST_EN[3]);
    default:
      return products;
  }
}

export const SortProductsRandom = (arr: Product[]) => {
  for (let i = arr.length - 1; i > 3; i--) {
    const j = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};
