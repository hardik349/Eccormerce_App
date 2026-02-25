import apiClient from './api';
import { ProductCategoryProps, ProductsResponse } from './types';

export const fetchProductCategories = async (): Promise<
  ProductCategoryProps[]
> => {
  try {
    const response = await apiClient.get<ProductCategoryProps[]>(
      '/products/categories',
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get<ProductsResponse>('/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};
