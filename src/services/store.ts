import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import { burgerReducer } from './burger-slice';
import { ingredientsReducer } from './ingredients-slice';
import { userReducer } from './user-slice';
import { ordersReducer } from './orders-slice';
import { feedReducer } from './feed-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerReducer,
  auth: userReducer,
  userOrders: ordersReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
