import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constants';

export const redirectToRoute = createAction('data/redirectToRoute',
  (redirect: AppRoute) => ({ payload: redirect })
);
