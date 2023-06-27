export enum AppRoute {
  logIn = '/logIn',
  Index = '/Index',
  Catalog = '/Catalog',
  Favourites = '/Favourites',
  ProductPage = '/ProductPage',
  SignUp = '/SignUp',
  NotFoundPage = '*',
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
