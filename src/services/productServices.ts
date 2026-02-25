import apiClient from './api';
import { ProductCategoryProps } from './types';

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
