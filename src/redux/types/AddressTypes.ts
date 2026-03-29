export interface Address {
  fullname: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface CheckoutState {
  shippingAddress: Address;
  billingAddress: Address;
  isBillingSameAsShipping: boolean;
}
