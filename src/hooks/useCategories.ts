import { useQuery } from '@tanstack/react-query';
import { fetchProductCategories } from '../services/productServices';

export const useCategories = () => {
  return useQuery({
    queryKey: ['productCategories'],
    queryFn: fetchProductCategories,
    staleTime: 1000 * 60 * 5,
  });
};
