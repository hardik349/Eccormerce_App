import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, CheckoutState } from '../types/AddressTypes';

const initialState: CheckoutState = {
  shippingAddress: {
    fullname: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  },
  billingAddress: {
    fullname: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  },
  isBillingSameAsShipping: true,
};

const CheckoutSlice = createSlice({
  name: 'Checkout',
  initialState: initialState,
  reducers: {
    updateShipping: (state, action: PayloadAction<Partial<Address>>) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
      if (state.isBillingSameAsShipping) {
        state.billingAddress = state.shippingAddress;
      }
    },
    setBillingSameAsShipping: (state, action: PayloadAction<boolean>) => {
      state.isBillingSameAsShipping = action.payload;
      if (action.payload) {
        state.billingAddress = state.shippingAddress;
      }
    },
    updateBilling: (state, action: PayloadAction<Partial<Address>>) => {
      state.billingAddress = { ...state.billingAddress, ...action.payload };
    },
  },
});

export const { updateShipping, setBillingSameAsShipping, updateBilling } =
  CheckoutSlice.actions;
export default CheckoutSlice.reducer;
