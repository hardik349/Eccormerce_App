export interface ProductCategoryProps {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: ProductProps[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductProps {
  id: number;
  image: string;
  price: number;
  category: string;
  title: string;
  thumbnail: string;
}
