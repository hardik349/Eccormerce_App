import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../slices/CartSlice';

const rootReducers = combineReducers({
  cart: cartReducer,
});

export default rootReducers;
