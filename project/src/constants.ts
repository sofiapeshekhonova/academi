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
  App = 'APP',
  User = 'USER',
  Comments = 'COMMENTS'
}

export enum APIRoute {
  Products = '/v0/keks/products',
  Comments = '/v0/keks/reviews/',
  Login = '/v0/keks/users/login',
  Logout = '/v0/keks/users/logout',
  Registration = '/v0/keks/users/registration',
  Favorites = '/v0/keks/favorites',
  DeleteFavorites = '/v0/keks/favorites'
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
  { id: 5, rating: 0 },
  { id: 4, rating: 1 },
  { id: 3, rating: 2 },
  { id: 2, rating: 3 },
  { id: 1, rating: 4 },
];

export const STARSS = [
  { id: 5, name: 'Rating 5' },
  { id: 4, name: 'Rating 4' },
  { id: 3, name: 'Rating 3' },
  { id: 2, name: 'Rating 2' },
  { id: 1, name: 'Rating 1' },
];

export const SortRatingList = [
  'Любой', 'Высокий', 'Низкий'
];

export const SecondSortRatingList = [
  {id: 'first', className: 'filter-sort__sort-btn filter-sort__sort-btn--inc', name: 'сортировка по возрастанию'},
  {id: 'second', className: 'filter-sort__sort-btn filter-sort__sort-btn--desc', name: 'сортировка по убыванию'}
];

export function SortDateComments(comments: ReviewsType[], sortListItem: string) {
  switch (sortListItem) {
    case 'first':
      return comments.slice().sort((a, b) => a.isoDate < b.isoDate ? 1 : -1);
    case 'second':
      return comments.slice().sort((a, b) => a.isoDate > b.isoDate ? 1 : -1);
    default:
      return comments.slice().sort((a, b) => a.isoDate < b.isoDate ? 1 : -1);
  }
}
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

export const MAP_MAPKER = '/img/content/map-marker1.svg';
export const MAP_MAPKER_SECOND = '/img/content/map-marker2.svg';

export const PLACES = [
  {
    id: 1,
    location: {
      address: 'Морской пр. 2А',
      name: 'Кондитерская 1',
      'latitude': 59.970969,
      'longitude': 30.316252,
      zoom: 4,
    },
  },
  {
    id: 2,
    location: {
      address: 'Большой пр. 2А',
      name: 'Производство',
      'latitude': 59.967947,
      'longitude': 30.274708,
      zoom: 4,
    },
  },
  {
    id: 3,
    location: {
      address: 'Малый пр. 2А',
      name: 'Кондитерская 2',
      'latitude': 59.960380,
      'longitude': 30.308725,
      zoom: 4,
    },
  },
];

export const CITY = {
  'name': 'Saint-Petersburg',
  'location': {
    'latitude': 59.964366,
    'longitude': 30.303038,
    'zoom': 14
  }
};

