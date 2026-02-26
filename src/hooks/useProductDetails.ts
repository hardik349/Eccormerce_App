import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails } from '../services/productServices';

export const useProductDetails = (id: number) => {
  return useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id,
  });
};
