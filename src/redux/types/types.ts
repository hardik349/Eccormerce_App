export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
  // You can add other fields if you need them in the cart UI
}

export interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  entities: { [key: number]: CartItem };
  ids: number[];
  totalQuantity: number;
  totalAmount: number;
}
