import { Product } from './types/product';
import { ReviewsType } from './types/review';

export enum AppRoute {
  logIn = '/logIn',
  Index = '/Index',
  Catalog = '/Catalog',
  Favourites = '/Favourites',
  ProductPage = '/ProductPage/:id',
  SignUp = '/SignUp',
  NotFoundPage = '*',
}

export enum Namespace {
  Products = 'PRODUCTS',
  ActiveProduct = 'PRODUCT',
  App = 'APP'
}

export enum APIRoute {
  Products = '/v0/keks/products',
  Comments = '/v0/keks/reviews/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Status {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export enum RoomType {
  apartment = 'Apartment',
  room = 'Private room',
  house = 'House',
  hotel = 'Hotel',
}

export const SortProducts = (arr: Product[]) => {
  for (let i = arr.length - 1; i > 3; i--) {
    const j = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const STARS = [
  { id: 5, rating: 0},
  { id: 4, rating: 1},
  { id: 3, rating: 2},
  { id: 2, rating: 3},
  { id: 1, rating: 4},
];

export const SortRatingList = [
  'Любой','Высокий','Низкий'
];

export function SortCards(comments: ReviewsType[], sortListItem: string) {
  switch (sortListItem) {
    case SortRatingList[0]:
      return comments;
    case SortRatingList[1]:
      return comments.slice().filter((i) => i.rating > 3);
    case SortRatingList[2]:
      return comments.slice().filter((i) => i.rating <= 3);
    default:
      return comments;
  }
}

// export const SortList = [1,2];

// export function SortComments(comments: ReviewsType[], sortListItem: number) {
//   switch (sortListItem) {
//     case SortList[0]:
//       return comments;
//     case SortList[1]:
//       return comments.slice().sort((b, a) => );
//     default:
//       return comments;
//   }
// }


export const CatalogSecondFilterListEn = ['vegetarian','new-york','lemon','vanilla'];


export const CatalogSecondFilterList = [
  { ru: 'Вегетарианский', en: 'vegetarian'},
  { ru: 'Нью-Йорк', en: 'new-york'},
  { ru: 'Лимонный', en: 'lemon'},
  { ru: 'Ваниль', en: 'vanilla'},
];

export const CatalogFilterList = ['Бисквит', 'Десерт', 'Чизкейк', 'Песочное'];

export function SortCatalog(products: Product[], sortListItem: string) {
  switch (sortListItem) {
    case CatalogFilterList[0]:
      return products.slice().filter((i) => i.category === 'bisque');
    case CatalogFilterList[1]:
      return products.slice().filter((i) => i.category === 'dessert');
    case CatalogFilterList[2]:
      return products.slice().filter((i) => i.category === 'cheesecake');
    case CatalogFilterList[3]:
      return products.slice().filter((i) => i.category === 'shortbread');
    default:
      return products;
  }
}

export const CatalogList = [
  {
    id: 1, name: 'Бисквит',
    type: [
      { ru: 'Вегетарианский', en: 'vegetarian' },
      { ru: 'Ваниль', en: 'vanilla' },
      { ru: 'Шоколадный', en: 'chocolate' },
      { ru: 'Медовый', en: 'honey-cake' },
    ]
  },
  {
    id: 2, name: 'Десерт',
    type: [
      { ru: 'Шоколадный', en: 'chocolate-muffin' },
      { ru: 'Фирменный', en: 'brand-muffin' }
    ]
  },
  {
    id: 2, name: 'Чизкейк',
    type: [
      { ru: 'Шоколадный', en: 'chocolate' },
      { ru: 'Ваниль', en: 'vanilla' },
      { ru: 'Вегетарианский', en: 'vegetarian' },
      { ru: 'Лимонный', en: 'lemon' },
      { ru: 'Нью-Йорк', en: 'new-york' },
    ]
  },
  {
    id: 2, name: 'Песочное',
    type: [
      { ru: 'Тарт', en: 'tart' },
      { ru: 'Муравейник', en: 'funnel-cake' },
      { ru: 'Корзинка', en: 'basket-cake' }
    ]
  }
];

