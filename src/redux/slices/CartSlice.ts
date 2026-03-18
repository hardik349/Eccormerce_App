import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../types/types';

const initialState: CartState = {
  entities: {},
  ids: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState: initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const id = product.id;
      state.totalQuantity++;
      state.totalAmount += product.price;

      if (state.entities[id]) {
        state.entities[id].quantity += 1;
        state.entities[id].totalPrice += product.price;
      } else {
        state.ids.push(id);
        state.entities[id] = {
          ...product,
          quantity: 1,
          totalPrice: product.price,
        };
      }
    },

    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.entities[id];

      if (!existingItem) return;
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        delete state.entities[id];
        state.ids = state.ids.filter(itemId => itemId !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },

    clearCart: () => initialState,
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
