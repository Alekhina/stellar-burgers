import { combineReducers } from 'redux';
import { burgerReducer } from './burger-slice';
import { ingredientsReducer } from './ingredients-slice';
import { userReducer } from './user-slice';
import { ordersReducer } from './orders-slice';
import { feedReducer } from './feed-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerReducer,
  auth: userReducer,
  userOrders: ordersReducer,
  feed: feedReducer
});
