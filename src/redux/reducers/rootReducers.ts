import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../slices/CartSlice';
import checkoutReducer from '../slices/CheckoutSlice';

const rootReducers = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducers;
