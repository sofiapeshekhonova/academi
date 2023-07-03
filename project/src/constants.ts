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
  Products = 'products',
  Comments = 'reviews/',
  Login = 'users/login',
  Logout = 'users/logout',
  Registration = 'users/registration',
  Avatar = '/users/upload',
  Favorites = 'favorites',
  DeleteFavorites = 'favorites'
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

export const SORT_RATING_LIST = [
  'Любой', 'Высокий', 'Низкий'
];

export const SECOND_SORT_RATING_LIST = [
  { id: 'first', className: 'filter-sort__sort-btn filter-sort__sort-btn--inc', name: 'сортировка по возрастанию' },
  { id: 'second', className: 'filter-sort__sort-btn filter-sort__sort-btn--desc', name: 'сортировка по убыванию' }
];

export const CATALOG_FITER_LIST = ['Бисквит', 'Десерт', 'Чизкейк', 'Песочное'];
export const CATALOG_FITER_LIST_EN = ['bisque', 'dessert', 'cheesecake', 'shortbread'];

export const CATALOG_LIST = [
  {
    id: 1, name: CATALOG_FITER_LIST[0],
    type: [
      { ru: 'Вегетарианский', en: 'vegetarian' },
      { ru: 'Ваниль', en: 'vanilla' },
      { ru: 'Шоколадный', en: 'chocolate' },
      { ru: 'Медовый', en: 'honey-cake' },
    ]
  },
  {
    id: 2, name: CATALOG_FITER_LIST[1],
    type: [
      { ru: 'Шоколадный', en: 'chocolate-muffin' },
      { ru: 'Фирменный', en: 'brand-muffin' }
    ]
  },
  {
    id: 2, name: CATALOG_FITER_LIST[2],
    type: [
      { ru: 'Шоколадный', en: 'chocolate' },
      { ru: 'Ваниль', en: 'vanilla' },
      { ru: 'Вегетарианский', en: 'vegetarian' },
      { ru: 'Лимонный', en: 'lemon' },
      { ru: 'Нью-Йорк', en: 'new-york' },
    ]
  },
  {
    id: 2, name: CATALOG_FITER_LIST[3],
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

export const NUMBER_SHOWN_CARDS = 6;
export const EMAIL_REGEX = /[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
export const PASSWORD_REGEX = /\d+[a-zA-Z]+|[a-zA-Z]+\d+/;
export const EMAIL_ERROR_TEXT = 'Введите валидную почту';
export const PASSWORD_ERROR_TEXT = 'Пароль должен содержать одну буву и цифру';
export const NAME_ERROR_TEXT = 'Имя Должно быть больше 1 буквы';
export const NAME_REGEX = /^.{1,20}$/;
export const IMG_REGEX = /^[^?#]+\.(png|jpg|jpe?g)([?#].*)?$/i;
export const IMG_ERROR_TEXT = 'не более 100 на 100 пикселей, размер менее 1 мб';
export const COUNT_COMMENTS = 2;

export const MIN_CHARACTERS = 2;
export const MAX_CHARACTERS = 500;

export const COMMENTS = [{
  'id': 'a427f2c1-fdc6-497c-811d-94285035080c',
  'positive': 'Нравится вкус изделий, отличный сервис и персонал, спасибо Вам!',
  'negative': 'Отличный сервис! Отзывчивы персонал, но вкус не обрадовал: украшения подсохли, начинка слишком сладкая. На любителя.',
  'rating': 5,
  'user': {
    'name': 'Елена',
    'avatarUrl': 'https://grading.design.pages.academy/static/keks/avatar/haty.jpg'
  },
  'isoDate': '2023-07-02T10:10:31.931Z',

},
{
  'id': '8ca0d0a8-07aa-4846-81d9-dc920920fb61',
  'positive': 'Хотелось бы узнать все секретные рецепты кондитера, очень вкусно.',
  'negative': 'Оказалось не таким на вкус, как по описанию.',
  'rating': 0,
  'user': {
    'name': 'Алина',
    'avatarUrl': 'https://grading.design.pages.academy/static/keks/avatar/cat.jpg'
  },
  'isoDate': '2023-07-02T10:16:10.185Z'
}
];
