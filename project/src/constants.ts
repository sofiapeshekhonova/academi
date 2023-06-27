import { Product } from './types/product';

export enum AppRoute {
  logIn = '/logIn',
  Index = '/Index',
  Catalog = '/Catalog',
  Favourites = '/Favourites',
  ProductPage = '/ProductPage',
  SignUp = '/SignUp',
  NotFoundPage = '*',
}

export enum Namespace {
  Products = 'PRODUCTS',
  App = 'APP'
}

export enum APIRoute {
  Products = '/v0/keks/products',
  Hotels = '/v0/keks/products',
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
